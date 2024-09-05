import { TCar } from "./TCar";

export type TReview={
    _id:string
    car:TCar;
    name: string;
    email: string;
    rating: number;
    comment: string;
    isDeleted?:boolean
    createdAt: string;
}
