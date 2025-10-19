/**
 * Developer Monitoring Dashboard
 * A debug panel for viewing logs, performance metrics, and system info
 * Only visible in development mode
 */

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import logger, { LogLevel } from '@/utils/logger';
import performanceMonitor from '@/utils/performance';
import { Activity, Download, Trash2, X } from 'lucide-react';

export default function MonitoringDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState(logger.getLogs());
  const [webVitals, setWebVitals] = useState(performanceMonitor.getWebVitals());
  const [memory, setMemory] = useState(performanceMonitor.getMemoryUsage());

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(logger.getLogs());
      setWebVitals(performanceMonitor.getWebVitals());
      setMemory(performanceMonitor.getMemoryUsage());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Only show in development
  if (!import.meta.env.DEV) return null;

  const handleClearLogs = () => {
    logger.clearLogs();
    setLogs([]);
  };

  const handleDownloadLogs = () => {
    logger.downloadLogs();
  };

  const handleClearMetrics = () => {
    performanceMonitor.clearMetrics();
  };

  const handleDownloadMetrics = () => {
    const data = performanceMonitor.exportMetrics();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `metrics-${new Date().toISOString()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getLogLevelColor = (level: LogLevel) => {
    switch (level) {
      case LogLevel.ERROR:
        return 'text-red-600';
      case LogLevel.WARN:
        return 'text-yellow-600';
      case LogLevel.INFO:
        return 'text-blue-600';
      case LogLevel.DEBUG:
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        title="Open Monitoring Dashboard"
      >
        <Activity className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 right-0 w-full md:w-[600px] h-[500px] z-50 bg-background border-t md:border-l shadow-2xl">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Developer Dashboard</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="logs" className="h-[calc(100%-64px)]">
        <TabsList className="w-full justify-start border-b rounded-none">
          <TabsTrigger value="logs">Logs ({logs.length})</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="memory">Memory</TabsTrigger>
        </TabsList>

        {/* Logs Tab */}
        <TabsContent value="logs" className="h-full overflow-y-auto p-4 space-y-2">
          <div className="flex gap-2 mb-4">
            <Button variant="outline" size="sm" onClick={handleDownloadLogs}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm" onClick={handleClearLogs}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>

          {logs.length === 0 ? (
            <p className="text-sm text-muted-foreground">No logs yet</p>
          ) : (
            logs.slice(-100).reverse().map((log, index) => (
              <Card key={index} className="text-xs">
                <CardHeader className="p-3 pb-2">
                  <div className="flex items-center justify-between">
                    <span className={`font-semibold ${getLogLevelColor(log.level)}`}>
                      [{log.level}]
                    </span>
                    <span className="text-muted-foreground">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  {log.context && (
                    <span className="text-muted-foreground">[{log.context}]</span>
                  )}
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <p className="mb-1">{log.message}</p>
                  {(() => {
                    if (!log.data) return null;
                    
                    try {
                      if (typeof log.data === 'object' && log.data !== null) {
                        return (
                          <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                            {JSON.stringify(log.data, null, 2)}
                          </pre>
                        );
                      }
                      return (
                        <p className="text-muted-foreground">{String(log.data)}</p>
                      );
                    } catch {
                      return <p className="text-muted-foreground">Failed to display data</p>;
                    }
                  })()}
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="h-full overflow-y-auto p-4">
          <div className="flex gap-2 mb-4">
            <Button variant="outline" size="sm" onClick={handleDownloadMetrics}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm" onClick={handleClearMetrics}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Web Vitals</CardTitle>
                <CardDescription>Core Web Vitals metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">LCP (Largest Contentful Paint)</span>
                  <span className="text-sm">
                    {webVitals.lcp ? `${Math.round(webVitals.lcp)}ms` : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">FID (First Input Delay)</span>
                  <span className="text-sm">
                    {webVitals.fid ? `${Math.round(webVitals.fid)}ms` : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">CLS (Cumulative Layout Shift)</span>
                  <span className="text-sm">
                    {webVitals.cls ? webVitals.cls.toFixed(3) : 'N/A'}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recent Metrics</CardTitle>
                <CardDescription>Last 10 performance measurements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-xs">
                  {performanceMonitor.getMetrics().slice(-10).reverse().map((metric, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="truncate flex-1">{metric.name}</span>
                      <span className="text-muted-foreground ml-2">
                        {Math.round(metric.value)}{metric.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Memory Tab */}
        <TabsContent value="memory" className="h-full overflow-y-auto p-4">
          {memory ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">JavaScript Heap Memory</CardTitle>
                <CardDescription>Current memory usage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Used</span>
                    <span className="text-sm">{formatBytes(memory.used)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Limit</span>
                    <span className="text-sm">{formatBytes(memory.limit)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Usage</span>
                    <span className="text-sm">{memory.percentage.toFixed(2)}%</span>
                  </div>
                </div>

                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${Math.min(memory.percentage, 100)}%` }}
                  />
                </div>

                {memory.percentage > 80 && (
                  <p className="text-sm text-yellow-600">
                    ⚠️ High memory usage detected
                  </p>
                )}
              </CardContent>
            </Card>
          ) : (
            <p className="text-sm text-muted-foreground">
              Memory monitoring not available in this browser
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
