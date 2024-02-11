import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoteRepository } from 'src/domain/repositories/notesRepository.interface';
import { Repository } from 'typeorm';
import { Note } from '../entities/notes.entity';

@Injectable()
export class DatabaseTodoRepository implements NoteRepository {
  constructor(
    @InjectRepository(Note)
    private readonly noteEntityRepository: Repository<Note>,
  ) {}

  async updateContent(id: number, content: string): Promise<void> {
    await this.noteEntityRepository.update(
      {
        id: id,
      },
      { content },
    );
  }
  async insert(note: Note): Promise<Note> {
    const noteEntity = this.toNoteEntity(note);
    const result = await this.noteEntityRepository.insert(noteEntity);
    return this.toNote(result.generatedMaps[0] as Note);
  }
  async findAll(): Promise<Note[]> {
    const notesEntity = await this.noteEntityRepository.find();
    return notesEntity.map((noteEntity) => this.toNote(noteEntity));
  }
  async findById(id: number): Promise<Note> {
    const todoEntity = await this.noteEntityRepository.findOneOrFail({
      where: { id },
    });
    return this.toNote(todoEntity);
  }
  async deleteById(id: number): Promise<void> {
    await this.noteEntityRepository.delete({ id: id });
  }

  private toNote(noteEntity: Note): Note {
    const note: Note = new Note();

    note.id = noteEntity.id;
    note.content = noteEntity.content;
    note.createdate = noteEntity.createdate;
    note.updateddate = noteEntity.updateddate;

    return note;
  }

  private toNoteEntity(note: Note): Note {
    const noteEntity: Note = new Note();

    noteEntity.id = note.id;
    noteEntity.content = note.content;

    return noteEntity;
  }
}
