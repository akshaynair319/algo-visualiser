import React, { useState } from "react";

function Customize() {
  const [customize, setCustomize] = useState(false);

  return (
    <div>
      <i
        class="fas fa-chevron-circle-down fa-2x "
        onClick={() => setCustomize(!customize)}
      ></i>
    </div>
  );
}

export default Customize;
