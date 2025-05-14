import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';

export default function PostCard({ post }) {
  // Format the date
  const formattedDate = format(new Date(post.published_at), 'MMM d, yyyy');
  
  // Create a brief excerpt from the content
  const createExcerpt = (content, maxLength = 150) => {
    // Remove HTML tags and get plain text
    const plainText = content.replace(/<[^>]+>/g, '');
    
    if (plainText.length <= maxLength) {
      return plainText;
    }
    
    // Find the last space within the maxLength to avoid cutting words
    const lastSpace = plainText.lastIndexOf(' ', maxLength);
    return plainText.substring(0, lastSpace) + '...';
  };
  
  const excerpt = createExcerpt(post.content);
  
  return (
    <div className="card h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 relative">
        {post.featured_image ? (
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>
      
      <div className="card-body flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">{formattedDate}</span>
          
          {post.tags && post.tags.length > 0 && (
            <span className="text-xs font-medium bg-primary-light bg-opacity-20 text-primary px-2 py-1 rounded">
              {post.tags[0]}
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
          <Link href={`/posts/${post.slug}`}>
            {post.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 mb-4 flex-grow">{excerpt}</p>
        
        <Link 
          href={`/posts/${post.slug}`}
          className="mt-auto inline-flex items-center text-sm font-medium text-primary hover:text-primary-dark"
        >
          Read More
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
