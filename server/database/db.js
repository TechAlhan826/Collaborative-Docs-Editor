import mongoose from 'mongoose';

export const Connections = async (username = 'collab-docs-editor-2', password = 'CollaB_DocS_EditoR_2') => {
    const URL = `mongodb+srv://collab-docs-editor-2:${password}@collaborative-docs-edit.ppyb78f.mongodb.net/?retryWrites=true&w=majority&appName=Collaborative-Docs-Editor`;

    try {
        await mongoose.connect(URL);
        console.log('Database connected successfully');
    } catch (error) {   
        console.log('Error while connecting with the database ', error);
    }
}