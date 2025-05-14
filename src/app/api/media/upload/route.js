import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';

/**
 * API route for handling media file uploads
 * Handles image optimization and saving to appropriate directories
 */
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const category = formData.get('category') || 'uncategorized';
    const description = formData.get('description') || '';
    
    if (!file) {
      return NextResponse.json({ success: false, message: 'No file provided' }, { status: 400 });
    }
    
    // Create buffer from file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Generate unique filename
    const originalName = file.name.replace(/\.[^/.]+$/, "");
    const fileExt = path.extname(file.name);
    const fileName = `${originalName}-${uuidv4()}${fileExt}`;
    
    // Determine directory based on category
    let uploadDir = path.join(process.cwd(), 'public', 'images', category);
    
    // Process image with sharp
    const processedImageBuffer = await sharp(buffer)
      .resize({
        width: 800,
        height: 600,
        fit: 'inside',
        withoutEnlargement: true
      })
      .toBuffer();
    
    // Save processed image
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, processedImageBuffer);
    
    // Create thumbnail
    const thumbBuffer = await sharp(buffer)
      .resize(200, 200, { fit: 'cover' })
      .toBuffer();
    
    const thumbPath = path.join(uploadDir, 'thumbnails', fileName);
    await writeFile(thumbPath, thumbBuffer);
    
    // Return success with file information
    return NextResponse.json({
      success: true,
      file: {
        name: fileName,
        path: `/images/${category}/${fileName}`,
        thumbPath: `/images/${category}/thumbnails/${fileName}`,
        category,
        description,
        uploadedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
