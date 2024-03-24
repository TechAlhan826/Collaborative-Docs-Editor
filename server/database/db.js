import mongoose  from 'mongoose';

const Connection = async (username = 'collab-docs-editor-2', password = 'CollaB_DocS_EditoR_2') => {
    const URL = `mongodb+srv://${username}:${password}@collaborative-docs-edit.ppyb78f.mongodb.net/?retryWrites=true&w=majority&appName=Collaborative-Docs-Editor`;

    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log('Database connected successfully');
    } catch (error) {   
        console.log('Error while connecting with the database ', error);
    }
}

export default Connection;