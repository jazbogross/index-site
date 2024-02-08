import { useMediaAsset } from "@staticcms/core";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import React from "react";

const PostPreview = ({ entry, widgetFor }) => {
  const data = entry.get('data'); // Assuming entry is an Immutable.js Map
  const image = useMediaAsset(data.get('image')); // Adjusted for direct .get() on Immutable.js Map
  const youtubeLink = data.get('youtubelink'); // Direct .get() from entry data

  // Simplified without the extractVideoID function for clarity
  const youtubeEmbedUrl = youtubeLink ? `https://www.youtube.com/embed/${youtubeLink}` : '';

  return (
    <div className="mw6 center ph3 pv4">
      <h1 className="f2 lh-title b mb3">{data.get('title')}</h1>
      <div className="flex justify-between grey-3">
        <p>{format(parseISO(data.get('date')), "iii, MMM d, yyyy")}</p>
      </div>
      <div className="cms mw6">
        <p>{data.get('description')}</p>
        {image && <img src={image} alt={data.get('title')} />}
        {youtubeLink && (
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
