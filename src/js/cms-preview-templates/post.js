import { useMediaAsset } from "@staticcms/core";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import React from "react";

const PostPreview = ({ entry, widgetFor, collection, field }) => {
  const image = useMediaAsset(entry.getIn(['data', 'image']), collection, field, entry);
  const youtubeLink = entry.getIn(['data', 'youtubelink']); // Access the YouTube link

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
      <h1 className="f2 lh-title b mb3">{entry.getIn(['data', 'title'])}</h1>
      <div className="flex justify-between grey-3">
        <p>{format(parseISO(entry.getIn(['data', 'date'])), "iii, MMM d, yyyy")}</p>
      </div>
      <div className="cms mw6">
        <p>{entry.getIn(['data', 'description'])}</p>
        {image && <img src={image} alt={entry.getIn(['data', 'title'])} />}
        {youtubeEmbedUrl && (
          <iframe
            width="560"
            height="315"
            src={youtubeEmbedUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={entry.getIn(['data', 'title'])}
          ></iframe>
        )}
        {widgetFor("body")}
      </div>
    </div>
  );
};

export default PostPreview;
