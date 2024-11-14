export const generateRandomLightColor = () => {
  const lightColors = [
    "#E6E6E6",
    "#FFCACA",
    "#CBFFD9",
    "#CADCFF",
    "#FFFFCB",
    "#E1CBFF",
    "#CBFDFF",
    "#F7CBFF",
    "#FFEFCB",
    "#FFD1CB",
    "#CBFFFC",
    "#CBFFD1",
    "#FFCBF1",
    "#CBF1FF",
    "#FFCBE1",
    "#CBFFCB",
    "#FFCBCB",
  ];
  return lightColors[Math.floor(Math.random() * lightColors.length)];
};

export const getNameInitialsInUpperCase = (name) => {
  const initials = name
    ?.split(" ")
    ?.map((word) => word.charAt(0).toUpperCase())
    ?.join("");
  return initials;
};
