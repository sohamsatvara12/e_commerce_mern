import React from 'react';

function SectionHeading({ innerContent, outerContent, align = "center" }) {
  return (
    <h1 className={`my-5 text-${align}`}>
      <span className="bg-[#0078AD] rounded-lg px-5 py-2 text-white mr-5">
        {innerContent}
      </span>
      {outerContent}
    </h1>
  );
}

export default SectionHeading;
