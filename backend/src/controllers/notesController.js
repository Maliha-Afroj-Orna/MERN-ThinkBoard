import Note from '../models/Note.js';

export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({createdAt: -1});
        res.status(200).json(notes);
        
    } catch (error) {
        console.error("Error in getAllNotes controller: ", error);

        res.status(500).json({message: "Internal Server Error"});
    }
}

export const getNoteById = async (req, res) => {
    try {
        const _id = req.params.id;
        const note = await Note.findById(_id);

        if(!note) return res.status(404).json({message: 'Note not found'});

        res.status(200).json(note);

    } catch (error) {
        console.error('Error in getNoteById controller:', error);

        res.status(500).json({message: 'Internal Server Error'});
    }
}

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newNote = new Note({title, content});

        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
        
    } catch (error) {
        console.error('Error in createNote controller:', error);

        req.status(500).json({ message: 'Internal Server Error'});
    }
}

export const updateNote = async (req, res) => {
    try {
        const _id = req.params.id;
        const {title, content} = req.body;

        const updatedNote = await Note.findByIdAndUpdate(_id, {title, content}, {new: true});

        if(!updatedNote) return res.status(404).json({message: 'Note not found'});

        res.status(200).json(updatedNote);

    } catch (error) {
        console.error('Error in updateNote controller: ', error);

        res.status(500).json({message: 'Internal Server Error'});
    }
}

export const deleteNote = async (req, res) => {
    try {
        const _id = req.params.id;
        const deletedNote = await Note.findByIdAndDelete(_id);

        if(!deletedNote) return res.status(404).json({message: 'Note not found'});

        res.status(200).json({message: 'Note deleted successfully'});
    } catch (error) {
        console.error('Error in deleteNote controller: ', error);

        res.status(500).json({message: 'Internal Server Error'});
    }
}