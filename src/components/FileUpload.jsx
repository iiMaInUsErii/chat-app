import React, { useRef } from 'react';
import { FaPaperclip } from 'react-icons/fa'
import { MdOutlineDownloading } from 'react-icons/md'
import { uploadFile } from '../services/api';

const FileUpload = ({ roomId, user, onUpload }) => {
  const refUpload = useRef()

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const response = await uploadFile(roomId, user, file);
      onUpload(response.data);
    } catch (err) {
      console.log(err || 'Failed to upload file');
    }
  };

  return (
    <div>
        <div className="mt-2">
            <label className="cursor-pointer">
                <button
                    type="submit"
                    className="px-4 py-2 rounded-lg transition"
                    onClick={() => refUpload.current.click()}
                >
                    <FaPaperclip />
                </button>
                <input
                    ref={refUpload}
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </label>
        </div>
    </div>
  );
};

export default FileUpload;