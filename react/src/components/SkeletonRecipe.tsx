import React from 'react';
import '@/style/soma.css'

export const SkeletonRecipe = () => {
  return (
   <>
    <div className="recipe-container center ">
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text"></div>
    </div>

    <div className="recipe-container center">
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text"></div>
    </div>

    <div className="recipe-container center">
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text"></div>
    </div>
  </>
  );
};

