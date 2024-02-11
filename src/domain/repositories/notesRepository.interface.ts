import { Note } from '../notes.model';

export interface NoteRepository {
  insert(note: Note): Promise<Note>;
  findAll(): Promise<Note[]>;
  findById(id: number): Promise<Note>;
  updateContent(id: number, content: string): Promise<void>;
  deleteById(id: number): Promise<void>;
}
