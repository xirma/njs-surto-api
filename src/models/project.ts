const enum categories {
    TABLE,
    BAZAR
}

export interface Project {
    id: number;
    name: string;
    category: categories;
    description: string;
    img: string;
    user_id: number;
}