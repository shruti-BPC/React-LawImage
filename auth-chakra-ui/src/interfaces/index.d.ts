import { Column } from "@tanstack/react-table";

export interface ICategory {
    id: number;
    title: string;
}

export interface IPost {
    id: number;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
    category: { id: number };
   
}
export interface IFile {
    id: number;
    name: string;
    size:string
   
    createdAt: string;
}
export interface IRelatedItem {
    id: string;
    name: string;
    
   
}
export interface ColumnButtonProps {
    column: Column<any, any>; // eslint-disable-line
}

export interface FilterElementProps {
    value: any; // eslint-disable-line
    onChange: (value: any) => void; // eslint-disable-line
}
