const fs = require("fs");
const { romanToArabic } = require("./roman-numerals");

const fullText = fs.readFileSync("./the-text/full-gutenberg.txt", "utf8");
const ftLineByLine = fullText.split("\r\n");

// The first problem with Gutenberg's text is that it is separated into four
// volumes, as the text was published in book form, not the nine volumes by
// which Shandy refers to the text. For example, Chapter I of Volume II is
// referred to as Chapter 1.XXVI in Gutenberg.
//
// Similarly, there are sections like dedications and Slawkenbergius's tale
// that fall outside the chapter structure.

const breakpoints = [
  {gutVolume: 1, firstNewChapter: 26, newVolume: 2},
  // Slawkenbergius's tales though.
  {gutVolume: 2, firstNewChapter: 1, newVolume: 3},
  {gutVolume: 2, firstNewChapter: 36, newVolume: 4},
  {gutVolume: 3, firstNewChapter: 1, newVolume: 5},
  {gutVolume: 3, firstNewChapter: 44, newVolume: 6},
  {gutVolume: 3, firstNewChapter: 84, newVolume: 7},
  {gutVolume: 4, firstNewChapter: 1, newVolume: 7},
  {gutVolume: 4, firstNewChapter: 25, newVolume: 8},
  {gutVolume: 4, firstNewChapter: 60, newVolume: 9},
];



const chapterHeadings = ftLineByLine.filter(line => /Chapter \d\./.test(line));
const chapterNumbers = chapterHeadings.map(heading => {
  const [gutVolume, romanChapter] = heading.replace("Chapter ", "").split(".");
  // One chapter does not have a roman numeral.
  if(romanChapter === "the Seventy-eighth") {
    return {volume: "IX", chapter: "𝕿𝖍𝖊 𝕰𝖎𝖌𝖍𝖙𝖊𝖊𝖓𝖙𝖍 𝕮𝖍𝖆𝖕𝖙𝖊𝖗"};
  }

  const chapter = romanToArabic(romanChapter);
  // console.log(volume, chapter);
  return {volume, chapter}
});
