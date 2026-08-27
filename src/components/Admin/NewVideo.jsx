import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { addVideo, clearErrors } from '../../actions/videoAction';
import { NEW_VIDEO_RESET } from '../../constants/videoConstants';

const NewVideo = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const { loading, error, success } = useSelector((state) => state.newVideo);

    const [title, setTitle] = useState("");
    const [type, setType] = useState("youtube");
    const [url, setUrl] = useState("");
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (success) {
            enqueueSnackbar("Video Added Successfully", { variant: "success" });
            dispatch({ type: NEW_VIDEO_RESET });
            navigate("/admin/videos");
        }
    }, [dispatch, error, success, enqueueSnackbar, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        
        if (type === 'video') {
            const formData = new FormData();
            formData.set("title", title);
            formData.set("type", type);
            if (file) {
                formData.set("videoFile", file);
            }
            dispatch(addVideo(formData));
        } else {
            dispatch(addVideo({ title, type, url }));
        }
    };

    return (
        <div className="w-full flex justify-center">
            <div className="bg-white p-10 rounded-3xl shadow-xl shadow-blue-900/5 border border-blue-50 w-full max-w-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 to-blue-600"></div>
                
                <h2 className="text-3xl font-semibold text-center text-blue-950 uppercase tracking-tighter mb-10">
                    Add New Media
                </h2>

                <form onSubmit={submitHandler} className="flex flex-col gap-8">
                    <div className="flex flex-col gap-3">
                        <label className="text-xs font-semibold text-green-900/50 uppercase tracking-[0.2em]">Video Title</label>
                        <input
                            type="text"
                            placeholder="Enter display title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full px-5 py-4 bg-green-50/50 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-blue-950 font-medium transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-3">
                        <label className="text-xs font-semibold text-green-900/50 uppercase tracking-[0.2em]">Media Type</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full px-5 py-4 bg-green-50/50 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-blue-950 font-medium transition-all cursor-pointer"
                        >
                            <option value="youtube">YouTube Embed URL</option>
                            <option value="video">Upload Local Video (.mp4)</option>
                        </select>
                    </div>

                    {type === 'youtube' ? (
                        <div className="flex flex-col gap-3">
                            <label className="text-xs font-semibold text-green-900/50 uppercase tracking-[0.2em]">Source URL</label>
                            <input
                                type="text"
                                placeholder="https://www.youtube.com/embed/..."
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                required
                                className="w-full px-5 py-4 bg-green-50/50 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-blue-950 font-medium transition-all"
                            />
                            <span className="text-[11px] text-green-900/40 font-semibold bg-green-50 px-3 py-2 rounded-lg border border-blue-100">
                                ℹ️ Must be an embed URL: youtube.com/embed/VIDEO_ID
                            </span>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            <label className="text-xs font-semibold text-green-900/50 uppercase tracking-[0.2em]">Upload MP4 Video</label>
                            <input
                                type="file"
                                accept="video/mp4"
                                onChange={(e) => setFile(e.target.files[0])}
                                required
                                className="w-full px-5 py-4 bg-green-50/50 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-blue-950 font-medium transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                            />
                            <span className="text-[11px] text-green-900/40 font-semibold bg-green-50 px-3 py-2 rounded-lg border border-blue-100">
                                ℹ️ Max file size: 50MB. Only .mp4 files are supported.
                            </span>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-5 bg-[#16a34a] text-white font-semibold uppercase tracking-[0.3em] rounded-xl mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : 'shadow-xl shadow-blue-500/30 hover:bg-blue-800 hover:scale-[1.02]'} transition-all duration-300`}
                    >
                        {loading ? "Processing..." : "Publish Media"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewVideo;
