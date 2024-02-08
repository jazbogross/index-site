import { useMediaAsset } from "@staticcms/core";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import React from "react";

const PostPreview = ({ entry, widgetFor, collection, field }) => {
  const data = entry.get('data'); // Assuming this works as expected in your environment
  const image = useMediaAsset(data.get('image'), collection, field, entry);
  const youtubeLink = data.get('youtubelink'); // Directly access the YouTube link like other fields

  // Function to extract the YouTube video ID from the URL
  const extractVideoID = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = youtubeLink ? extractVideoID(youtubeLink) : null;
  const youtubeEmbedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : '';

  return (
    <div className="mw6 center ph3 pv4">
      <h1 className="f2 lh-title b mb3">{data.get('title')}</h1>
      <div className="flex justify-between grey-3">
        <p>{format(parseISO(data.get('date')), "iii, MMM d, yyyy")}</p>
      </div>
      <div className="cms mw6">
        <p>{data.get('description')}</p>
        {image && <img src={image} alt={data.get('title')} />}
        {youtubeEmbedUrl && (
          <iframe
            width="560"
            height="315"
            src={youtubeEmbedUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={data.get('title')}
          ></iframe>
        )}
        {widgetFor("body")}
      </div>
    </div>
  );
};

export default PostPreview;
