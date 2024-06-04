import axios from 'axios';
import { showToastError } from "./Notifications/toastUtils";

export interface Author {
  id: number;
  name: string;
  email: string;
  description: string;
  profilePicture: string;
  createdAt: string;
  updatedAt: string | null;
  version: number;
}

export async function getAuthor(creatorId: number): Promise<Author | null> {
  try {
    const response = await axios.get(`/api/users/${creatorId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    showToastError(`Could not retrieve author with ID ${creatorId}`);
    return null;
  }
}