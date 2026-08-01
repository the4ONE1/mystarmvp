// PDF storybook generation using pdf-lib
// Produces a multi-page PDF with title page, dedication, and chapter pages.

import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

// Colour palette (approximating the MyStar gold brand)
const COLOR_GOLD = rgb(0.788, 0.592, 0.227);
const COLOR_DARK = rgb(0.133, 0.133, 0.133);
const COLOR_MID = rgb(0.4, 0.4, 0.4);
const COLOR_BG_WARM = rgb(0.996, 0.973, 0.933); // #fef8ee

const PAGE_WIDTH = 595.28; // A4 portrait (points)
const PAGE_HEIGHT = 841.89;
const MARGIN = 60;

/**
 * Wrap a string to fit within maxWidth using the given font and size.
 * Returns an array of line strings.
 */
async function wrapText(text, font, size, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let current = '';

  for (const word of words) {
    const test = current ? current + ' ' + word : word;
    const width = font.widthOfTextAtSize(test, size);
    if (width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

/**
 * Draw wrapped text on a page, returning the Y position after the last line.
 */
async function drawWrappedText(page, text, { font, size, x, y, maxWidth, lineHeight, color }) {
  const lines = await wrapText(text, font, size, maxWidth);
  let curY = y;
  for (const line of lines) {
    page.drawText(line, { x, y: curY, size, font, color });
    curY -= lineHeight;
  }
  return curY;
}

/**
 * Generate a storybook PDF.
 *
 * @param {object} story  - { title, dedication, chapters: [{heading, text}] }
 * @param {object} order  - { childName, customerName, theme }
 * @returns {Promise<Uint8Array>} PDF bytes
 */
export async function generateStoryPDF(story, order) {
  const pdfDoc = await PDFDocument.create();

  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const italicFont = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  const contentWidth = PAGE_WIDTH - MARGIN * 2;

  // ─── Title Page ───────────────────────────────────────────────────────────
  const titlePage = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  titlePage.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: COLOR_BG_WARM });

  // Decorative top band
  titlePage.drawRectangle({ x: 0, y: PAGE_HEIGHT - 180, width: PAGE_WIDTH, height: 180, color: COLOR_GOLD });

  titlePage.drawText('⭐', { x: PAGE_WIDTH / 2 - 20, y: PAGE_HEIGHT - 90, size: 48, font: boldFont, color: rgb(1, 1, 1) });

  titlePage.drawText('MyStar Stories', {
    x: MARGIN,
    y: PAGE_HEIGHT - 160,
    size: 14,
    font: boldFont,
    color: rgb(1, 1, 1),
  });

  // Title
  const titleLines = await wrapText(story.title, boldFont, 30, contentWidth);
  let titleY = PAGE_HEIGHT - 250;
  for (const line of titleLines) {
    titlePage.drawText(line, { x: MARGIN, y: titleY, size: 30, font: boldFont, color: COLOR_DARK });
    titleY -= 42;
  }

  // Subtitle
  titlePage.drawText(`A personalized story for ${order.childName || 'you'}`, {
    x: MARGIN,
    y: titleY - 16,
    size: 16,
    font: italicFont,
    color: COLOR_MID,
  });

  // Dedication
  if (story.dedication) {
    titlePage.drawText('—  A special message  —', {
      x: MARGIN,
      y: 200,
      size: 11,
      font: italicFont,
      color: COLOR_GOLD,
    });
    await drawWrappedText(titlePage, `"${story.dedication}"`, {
      font: italicFont,
      size: 13,
      x: MARGIN,
      y: 178,
      maxWidth: contentWidth,
      lineHeight: 20,
      color: COLOR_MID,
    });
  }

  // Footer
  titlePage.drawText('mystarstories.app', {
    x: MARGIN,
    y: 40,
    size: 10,
    font: regularFont,
    color: COLOR_GOLD,
  });

  // ─── Chapter Pages ─────────────────────────────────────────────────────────
  for (let i = 0; i < story.chapters.length; i++) {
    const chapter = story.chapters[i];
    const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: rgb(1, 1, 1) });

    // Chapter number band
    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 80, width: PAGE_WIDTH, height: 80, color: COLOR_GOLD });
    page.drawText(`Chapter ${i + 1}`, {
      x: MARGIN,
      y: PAGE_HEIGHT - 50,
      size: 12,
      font: boldFont,
      color: rgb(1, 1, 1),
    });
    page.drawText(order.childName ? `${order.childName}'s Story` : 'MyStar Stories', {
      x: PAGE_WIDTH - MARGIN - 120,
      y: PAGE_HEIGHT - 50,
      size: 11,
      font: regularFont,
      color: rgb(1, 1, 1),
    });

    // Chapter heading
    await drawWrappedText(page, chapter.heading, {
      font: boldFont,
      size: 22,
      x: MARGIN,
      y: PAGE_HEIGHT - 130,
      maxWidth: contentWidth,
      lineHeight: 30,
      color: COLOR_DARK,
    });

    // Divider
    page.drawLine({
      start: { x: MARGIN, y: PAGE_HEIGHT - 165 },
      end: { x: PAGE_WIDTH - MARGIN, y: PAGE_HEIGHT - 165 },
      thickness: 1.5,
      color: COLOR_GOLD,
    });

    // Chapter body
    await drawWrappedText(page, chapter.text, {
      font: regularFont,
      size: 13,
      x: MARGIN,
      y: PAGE_HEIGHT - 195,
      maxWidth: contentWidth,
      lineHeight: 22,
      color: COLOR_DARK,
    });

    // Page number
    page.drawText(`${i + 2}`, {
      x: PAGE_WIDTH / 2 - 5,
      y: 35,
      size: 11,
      font: regularFont,
      color: COLOR_MID,
    });
  }

  // ─── Back Page ─────────────────────────────────────────────────────────────
  const backPage = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  backPage.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: COLOR_BG_WARM });
  backPage.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: 100, color: COLOR_GOLD });

  backPage.drawText('The End', {
    x: PAGE_WIDTH / 2 - 50,
    y: PAGE_HEIGHT / 2 + 20,
    size: 36,
    font: boldFont,
    color: COLOR_GOLD,
  });
  backPage.drawText(`Thank you for making ${order.childName || 'your child'} the star of their own story.`, {
    x: MARGIN,
    y: PAGE_HEIGHT / 2 - 30,
    size: 13,
    font: italicFont,
    color: COLOR_MID,
  });

  backPage.drawText('mystarstories.app', {
    x: PAGE_WIDTH / 2 - 55,
    y: 50,
    size: 14,
    font: boldFont,
    color: rgb(1, 1, 1),
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
