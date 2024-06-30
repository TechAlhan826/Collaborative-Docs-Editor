import { document as DocumentModel } from '../schema/doc-schema.js';

export const getDocument = async (id) => {
    if (id === null) return;

    const doc = await DocumentModel.findById(id);

    if (doc) return doc;

    return await DocumentModel.create({ _id: id, data: "" });
}

export const updateDocument = async (id, data) => {
    return await DocumentModel.findByIdAndUpdate(id, { data });
}
