/**
 * Performance Monitoring Utility
 * Tracks and reports performance metrics for the application
 */

import logger from './logger';

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: Date;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private observers: Map<string, PerformanceObserver> = new Map();

  constructor() {
    this.initializeObservers();
  }

  /**
   * Initialize performance observers
   */
  private initializeObservers(): void {
    if (typeof window === 'undefined' || !window.PerformanceObserver) return;

    // Observe navigation timing
    try {
      const navigationObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.recordMetric('navigation', entry.duration, 'ms');
          logger.logPerformance('Page Load', entry.duration);
        }
      });
      navigationObserver.observe({ type: 'navigation', buffered: true });
      this.observers.set('navigation', navigationObserver);
    } catch {
      console.warn('Navigation timing not supported');
    }

    // Observe resource timing
    try {
      const resourceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const resource = entry as PerformanceResourceTiming;
          this.recordMetric(`resource:${resource.name}`, resource.duration, 'ms');
        }
      });
      resourceObserver.observe({ type: 'resource', buffered: true });
      this.observers.set('resource', resourceObserver);
    } catch {
      console.warn('Resource timing not supported');
    }

    // Observe largest contentful paint
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry;
        this.recordMetric('lcp', lastEntry.startTime, 'ms');
        logger.logPerformance('Largest Contentful Paint', lastEntry.startTime);
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      this.observers.set('lcp', lcpObserver);
    } catch {
      console.warn('LCP not supported');
    }

    // Observe first input delay
    try {
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const firstInput = entry as PerformanceEventTiming;
          const fid = firstInput.processingStart - firstInput.startTime;
          this.recordMetric('fid', fid, 'ms');
          logger.logPerformance('First Input Delay', fid);
        }
      });
      fidObserver.observe({ type: 'first-input', buffered: true });
      this.observers.set('fid', fidObserver);
    } catch {
      console.warn('FID not supported');
    }
  }

  /**
   * Measure function execution time
   */
  async measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const start = performance.now();
    try {
      const result = await fn();
      const duration = performance.now() - start;
      this.recordMetric(name, duration, 'ms');
      logger.logPerformance(name, duration);
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      this.recordMetric(`${name}:error`, duration, 'ms');
      throw error;
    }
  }

  /**
   * Measure synchronous function execution time
   */
  measure<T>(name: string, fn: () => T): T {
    const start = performance.now();
    try {
      const result = fn();
      const duration = performance.now() - start;
      this.recordMetric(name, duration, 'ms');
      logger.logPerformance(name, duration);
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      this.recordMetric(`${name}:error`, duration, 'ms');
      throw error;
    }
  }

  /**
   * Start a manual performance measurement
   */
  startMark(name: string): void {
    performance.mark(`${name}-start`);
  }

  /**
   * End a manual performance measurement
   */
  endMark(name: string): number {
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
    
    const measure = performance.getEntriesByName(name, 'measure')[0];
    const duration = measure.duration;
    
    this.recordMetric(name, duration, 'ms');
    logger.logPerformance(name, duration);
    
    // Cleanup
    performance.clearMarks(`${name}-start`);
    performance.clearMarks(`${name}-end`);
    performance.clearMeasures(name);
    
    return duration;
  }

  /**
   * Record a custom metric
   */
  recordMetric(name: string, value: number, unit = 'ms'): void {
    this.metrics.push({
      name,
      value,
      unit,
      timestamp: new Date(),
    });

    // Keep only last 500 metrics
    if (this.metrics.length > 500) {
      this.metrics.shift();
    }
  }

  /**
   * Get all metrics
   */
  getMetrics(name?: string): PerformanceMetric[] {
    if (name) {
      return this.metrics.filter((m) => m.name === name);
    }
    return this.metrics;
  }

  /**
   * Get average metric value
   */
  getAverageMetric(name: string): number | null {
    const metrics = this.getMetrics(name);
    if (metrics.length === 0) return null;
    
    const sum = metrics.reduce((acc, m) => acc + m.value, 0);
    return sum / metrics.length;
  }

  /**
   * Get Web Vitals summary
   */
  getWebVitals(): {
    lcp: number | null;
    fid: number | null;
    cls: number | null;
  } {
    const lcpMetrics = this.getMetrics('lcp');
    const fidMetrics = this.getMetrics('fid');
    
    return {
      lcp: lcpMetrics.length > 0 ? lcpMetrics[lcpMetrics.length - 1].value : null,
      fid: fidMetrics.length > 0 ? fidMetrics[fidMetrics.length - 1].value : null,
      cls: this.getCLS(),
    };
  }

  /**
   * Calculate Cumulative Layout Shift
   */
  private getCLS(): number | null {
    if (!window.PerformanceObserver) return null;
    
    interface LayoutShiftEntry extends PerformanceEntry {
      value: number;
      hadRecentInput: boolean;
    }
    
    let cls = 0;
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const layoutShift = entry as LayoutShiftEntry;
          if (!layoutShift.hadRecentInput) {
            cls += layoutShift.value;
          }
        }
      });
      observer.observe({ type: 'layout-shift', buffered: true });
      
      // Disconnect after a short delay
      setTimeout(() => observer.disconnect(), 100);
    } catch {
      return null;
    }
    
    return cls;
  }

  /**
   * Measure component render time (for React components)
   */
  measureRender(componentName: string, phase: 'mount' | 'update', actualDuration: number): void {
    this.recordMetric(`render:${componentName}:${phase}`, actualDuration, 'ms');
    
    // Log slow renders
    if (actualDuration > 16) { // Slower than 60fps
      logger.warn(`Slow render detected: ${componentName} (${phase})`, {
        duration: actualDuration,
        threshold: 16,
      });
    }
  }

  /**
   * Export metrics as JSON
   */
  exportMetrics(): string {
    return JSON.stringify({
      metrics: this.metrics,
      webVitals: this.getWebVitals(),
      timestamp: new Date().toISOString(),
    }, null, 2);
  }

  /**
   * Clear all metrics
   */
  clearMetrics(): void {
    this.metrics = [];
  }

  /**
   * Disconnect all observers
   */
  disconnect(): void {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers.clear();
  }

  /**
   * Get memory usage (if available)
   */
  getMemoryUsage(): {
    used: number;
    limit: number;
    percentage: number;
  } | null {
    interface PerformanceMemory {
      usedJSHeapSize: number;
      jsHeapSizeLimit: number;
      totalJSHeapSize: number;
    }

    const perfWithMemory = performance as Performance & { memory?: PerformanceMemory };
    const memory = perfWithMemory.memory;
    if (!memory) return null;

    return {
      used: memory.usedJSHeapSize,
      limit: memory.jsHeapSizeLimit,
      percentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100,
    };
  }

  /**
   * Log current performance metrics
   */
  logCurrentMetrics(): void {
    const webVitals = this.getWebVitals();
    const memory = this.getMemoryUsage();

    logger.info('Performance Metrics', {
      webVitals,
      memory,
      metricsCount: this.metrics.length,
    }, 'PERFORMANCE');
  }
}

// Export singleton instance
const performanceMonitor = new PerformanceMonitor();
export default performanceMonitor;

