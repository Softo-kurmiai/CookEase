export interface User {
    id: number;
    name: string;
    email: string;
    profilePicture: string | null;
}

export interface Recipe {
    id: number;
    creatorId: number;
    name: string;
    description: string;
    rating: number,
    prepTime: number,
    cookTime: number,
    difficulty: string,
    servings: number,
    image: string,
    viewCount: number,
    commentCount: number,
    favoriteCount: number
}