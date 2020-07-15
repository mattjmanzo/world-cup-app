// 140 named colors supported by modern browsers

const colors = [
  { name: "INDIANRED", rgb: "rgb(205, 92, 92)" },

  { name: "LIGHTCORAL", rgb: "rgb(240, 128, 128)" },

  { name: "SALMON", rgb: "rgb(250, 128, 114)" },

  { name: "DARKSALMON", rgb: "rgb(233, 150, 122)" },

  { name: "LIGHTSALMON", rgb: "rgb(255, 160, 122)" },

  { name: "CRIMSON", rgb: "rgb(220, 20, 60)" },

  { name: "RED", rgb: "rgb(255, 0, 0)" },

  { name: "FIREBRICK", rgb: "rgb(178, 34, 34)" },

  { name: "DARKRED", rgb: "rgb(139, 0, 0)" },

  { name: "PINK", rgb: "rgb(255, 192, 203)" },

  { name: "LIGHTPINK", rgb: "rgb(255, 182, 193)" },

  { name: "HOTPINK", rgb: "rgb(255, 105, 180)" },

  { name: "DEEPPINK", rgb: "rgb(255, 20, 147)" },

  { name: "MEDIUMVIOLETRED", rgb: "rgb(199, 21, 133)" },

  { name: "PALEVIOLETRE", rgb: "rgb(219, 112, 147)" },

  { name: "LIGHTSALMON", rgb: "rgb(255, 160, 122)" },

  { name: "CORAL", rgb: "rgb(255, 127, 80)" },

  { name: "TOMATO", rgb: "rgb(255, 99, 71)" },

  { name: "ORANGERED", rgb: "rgb(255, 69, 0)" },

  { name: "DARKORANGE", rgb: "rgb(255, 140, 0)" },

  { name: "ORANGE", rgb: "rgb(255, 165, 0)" },

  { name: "GOLD", rgb: "rgb(255, 215, 0)" },

  { name: "YELLOW", rgb: "rgb(255, 255, 0)" },

  { name: "LIGHTYELLOW", rgb: "rgb(255, 255, 224)" },

  { name: "LEMONCHIFFON", rgb: "rgb(255, 250, 205)" },

  { name: "LIGHTGOLDENRODYELLOW", rgb: "rgb(250, 250, 210)" },

  { name: "PAPAYAWHIP", rgb: "rgb(255, 239, 213)" },

  { name: "MOCCASIN", rgb: "rgb(255, 228, 181)" },

  { name: "PEACHPUFF", rgb: "rgb(255, 218, 185)" },

  { name: "PALEGOLDENROD", rgb: "rgb(238, 232, 170)" },

  { name: "KHAKI", rgb: "rgb(240, 230, 140)" },

  { name: "DARKKHAKI", rgb: "rgb(189, 183, 107)" },

  { name: "LAVENDER", rgb: "rgb(230, 230, 250)" },

  { name: "THISTLE", rgb: "rgb(216, 191, 216)" },

  { name: "PLUM", rgb: "rgb(221, 160, 221)" },

  { name: "VIOLET", rgb: "rgb(238, 130, 238)" },

  { name: "ORCHID", rgb: "rgb(218, 112, 214)" },

  { name: "FUCHSIA", rgb: "rgb(255, 0, 255)" },

  { name: "MAGENTA", rgb: "rgb(255, 0, 255)" },

  { name: "MEDIUMORCHID", rgb: "rgb(186, 85, 211)" },

  { name: "MEDIUMPURPLE", rgb: "rgb(147, 112, 219)" },

  { name: "REBECCAPURPLE", rgb: "rgb(102, 51, 153)" },

  { name: "BLUEVIOLET", rgb: "rgb(138, 43, 226)" },

  { name: "DARKVIOLET", rgb: "rgb(148, 0, 211)" },

  { name: "DARKORCHID", rgb: "rgb(153, 50, 204)" },

  { name: "DARKMAGENTA", rgb: "rgb(139, 0, 139)" },

  { name: "PURPLE", rgb: "rgb(128, 0, 128)" },

  { name: "INDIGO", rgb: "rgb(75, 0, 130)" },

  { name: "SLATEBLUE", rgb: "rgb(106, 90, 205)" },

  { name: "DARKSLATEBLUE", rgb: "rgb(72, 61, 139)" },

  { name: "MEDIUMSLATEBLUE", rgb: "rgb(123, 104, 238)" },

  { name: "GREENYELLOW", rgb: "rgb(173, 255, 47)" },

  { name: "CHARTREUSE", rgb: "rgb(127, 255, 0)" },

  { name: "LAWNGREEN", rgb: "rgb(124, 252, 0)" },

  { name: "LIME", rgb: "rgb(0, 255, 0)" },

  { name: "LIMEGREEN", rgb: "rgb(50, 205, 50)" },

  { name: "PALEGREEN", rgb: "rgb(152, 251, 152)" },

  { name: "LIGHTGREEN", rgb: "rgb(144, 238, 144)" },

  { name: "MEDIUMSPRINGGREEN", rgb: "rgb(0, 250, 154)" },

  { name: "SPRINGGREEN", rgb: "rgb(0, 255, 127)" },

  { name: "MEDIUMSEAGREEN", rgb: "rgb(60, 179, 113)" },

  { name: "SEAGREEN", rgb: "rgb(46, 139, 87)" },

  { name: "FORESTGREEN", rgb: "rgb(34, 139, 34)" },

  { name: "GREEN", rgb: "rgb(0, 128, 0)" },

  { name: "DARKGREEN", rgb: "rgb(0, 100, 0)" },

  { name: "YELLOWGREEN", rgb: "rgb(154, 205, 50)" },

  { name: "OLIVEDRAB", rgb: "rgb(107, 142, 35)" },

  { name: "OLIVE", rgb: "rgb(128, 128, 0)" },

  { name: "DARKOLIVEGREEN", rgb: "rgb(85, 107, 47)" },

  { name: "MEDIUMAQUAMARINE", rgb: "rgb(102, 205, 170)" },

  { name: "DARKSEAGREEN", rgb: "rgb(143, 188, 139)" },

  { name: "LIGHTSEAGREEN", rgb: "rgb(32, 178, 170)" },

  { name: "DARKCYAN", rgb: "rgb(0, 139, 139)" },

  { name: "TEAL", rgb: "rgb(0, 128, 128)" },

  { name: "AQUA", rgb: "rgb(0, 255, 255)" },

  { name: "CYAN", rgb: "rgb(0, 255, 255)" },

  { name: "LIGHTCYAN", rgb: "rgb(224, 255, 255)" },

  { name: "PALETURQUOISE", rgb: "rgb(175, 238, 238)" },

  { name: "AQUAMARINE", rgb: "rgb(127, 255, 212)" },

  { name: "TURQUOISE", rgb: "rgb(64, 224, 208)" },

  { name: "MEDIUMTURQUOISE", rgb: "rgb(72, 209, 204)" },

  { name: "DARKTURQUOISE", rgb: "rgb(0, 206, 209)" },

  { name: "CADETBLUE", rgb: "rgb(95, 158, 160)" },

  { name: "STEELBLUE", rgb: "rgb(70, 130, 180)" },

  { name: "LIGHTSTEELBLUE", rgb: "rgb(176, 196, 222)" },

  { name: "POWDERBLUE", rgb: "rgb(176, 224, 230)" },

  { name: "LIGHTBLUE", rgb: "rgb(173, 216, 230)" },

  { name: "SKYBLUE", rgb: "rgb(135, 206, 235)" },

  { name: "LIGHTSKYBLUE", rgb: "rgb(135, 206, 250)" },

  { name: "DEEPSKYBLUE", rgb: "rgb(0, 191, 255)" },

  { name: "DODGERBLUE", rgb: "rgb(30, 144, 255)" },

  { name: "CORNFLOWERBLUE", rgb: "rgb(100, 149, 237)" },

  { name: "MEDIUMSLATEBLUE", rgb: "rgb(123, 104, 238)" },

  { name: "ROYALBLUE", rgb: "rgb(65, 105, 225)" },

  { name: "BLUE", rgb: "rgb(0, 0, 255)" },

  { name: "MEDIUMBLUE", rgb: "rgb(0, 0, 205)" },

  { name: "DARKBLUE", rgb: "rgb(0, 0, 139)" },

  { name: "NAVY", rgb: "rgb(0, 0, 128)" },

  { name: "MIDNIGHTBLUE", rgb: "rgb(25, 25, 112)" },

  { name: "CORNSILK", rgb: "rgb(255, 248, 220)" },

  { name: "BLANCHEDALMOND", rgb: "rgb(255, 235, 205)" },

  { name: "BISQUE", rgb: "rgb(255, 228, 196)" },

  { name: "NAVAJOWHITE", rgb: "rgb(255, 222, 173)" },

  { name: "WHEAT", rgb: "rgb(245, 222, 179)" },

  { name: "BURLYWOOD", rgb: "rgb(222, 184, 135)" },

  { name: "TAN", rgb: "rgb(210, 180, 140)" },

  { name: "ROSYBROWN", rgb: "rgb(188, 143, 143)" },

  { name: "SANDYBROWN", rgb: "rgb(244, 164, 96)" },

  { name: "GOLDENROD", rgb: "rgb(218, 165, 32)" },

  { name: "DARKGOLDENROD", rgb: "rgb(184, 134, 11)" },

  { name: "PERU", rgb: "rgb(205, 133, 63)" },

  { name: "CHOCOLATE", rgb: "rgb(210, 105, 30)" },

  { name: "SADDLEBROWN", rgb: "rgb(139, 69, 19)" },

  { name: "SIENNA", rgb: "rgb(160, 82, 45)" },

  { name: "BROWN", rgb: "rgb(165, 42, 42)" },

  { name: "MAROON", rgb: "rgb(128, 0, 0)" },

  { name: "WHITE", rgb: "rgb(255, 255, 255)" },

  { name: "SNOW", rgb: "rgb(255, 250, 250)" },

  { name: "HONEYDEW", rgb: "rgb(240, 255, 240)" },

  { name: "MINTCREAM", rgb: "rgb(245, 255, 250)" },

  { name: "AZURE", rgb: "rgb(240, 255, 255)" },

  { name: "ALICEBLUE", rgb: "rgb(240, 248, 255)" },

  { name: "GHOSTWHITE", rgb: "rgb(248, 248, 255)" },

  { name: "WHITESMOKE", rgb: "rgb(245, 245, 245)" },

  { name: "SEASHELL", rgb: "rgb(255, 245, 238)" },

  { name: "BEIGE", rgb: "rgb(245, 245, 220)" },

  { name: "OLDLACE", rgb: "rgb(253, 245, 230)" },

  { name: "FLORALWHITE", rgb: "rgb(255, 250, 240)" },

  { name: "IVORY", rgb: "rgb(255, 255, 240)" },

  { name: "ANTIQUEWHITE", rgb: "rgb(250, 235, 215)" },

  { name: "LINEN", rgb: "rgb(250, 240, 230)" },

  { name: "LAVENDERBLUSH", rgb: "rgb(255, 240, 245)" },

  { name: "MISTYROSE", rgb: "rgb(255, 228, 225)" },

  { name: "GAINSBORO", rgb: "rgb(220, 220, 220)" },

  { name: "LIGHTGRAY", rgb: "rgb(211, 211, 211)" },

  { name: "SILVER", rgb: "rgb(192, 192, 192)" },

  { name: "DARKGRAY", rgb: "rgb(169, 169, 169)" },

  { name: "GRAY", rgb: "rgb(128, 128, 128)" },

  { name: "DIMGRAY", rgb: "rgb(105, 105, 105)" },

  { name: "LIGHTSLATEGRAY", rgb: "rgb(119, 136, 153)" },

  { name: "SLATEGRAY", rgb: "rgb(112, 128, 144)" },

  { name: "DARKSLATEGRAY", rgb: "rgb(47, 79, 79)" },

  { name: "BLACK", rgb: "rgb(0, 0, 0)" },
];

export default colors;
