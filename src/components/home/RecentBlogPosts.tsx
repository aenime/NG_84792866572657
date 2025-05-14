import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: string;
  date: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
}

const RecentBlogPosts: React.FC = () => {
  // Sample blog posts data
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      slug: 'how-to-care-for-injured-animals',
      title: 'How to Provide First Aid for Injured Street Animals',
      excerpt: 'Learn simple yet effective ways to help injured animals before professional help arrives.',
      featuredImage: '/images/animals/injured/first-aid.jpg',
      date: '2025-05-05',
      author: {
        name: 'Dr. Anjali Singh',
        avatar: '/images/team/anjali.jpg'
      },
      category: 'Animal Care'
    },
    {
      id: '2',
      slug: 'impact-of-donations-2025',
      title: 'How Your Donations Made a Difference in 2024',
      excerpt: 'See the real impact of your generous contributions in our annual impact report.',
      featuredImage: '/images/impact-report-cover.jpg',
      date: '2025-04-20',
      author: {
        name: 'Vikram Mehta',
        avatar: '/images/team/vikram.jpg'
      },
      category: 'Impact Report'
    },
    {
      id: '3',
      slug: 'summer-care-tips-street-animals',
      title: 'Summer Care Tips for Street Animals in India',
      excerpt: 'Simple ways to help stray animals stay cool and hydrated during the hot summer months.',
      featuredImage: '/images/animals/summer-care.jpg',
      date: '2025-05-01',
      author: {
        name: 'Priya Sharma',
        avatar: '/images/team/priya.jpg'
      },
      category: 'Seasonal Care'
    }
  ];

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Our Latest Updates</h2>
          <p className="mt-2 text-gray-600">Stay informed about our activities and animal welfare tips</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 w-full">
                {post.featuredImage ? (
                  <div className="w-full h-full relative">
                    <Image 
                      src={post.featuredImage} 
                      alt={post.title}
                      layout="fill"
                      objectFit="cover"
                      priority={false}
                    />
                  </div>
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {post.category}
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center mb-4">
                  {post.author.avatar ? (
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                      <Image 
                        src={post.author.avatar} 
                        alt={post.author.name}
                        width={32}
                        height={32}
                        objectFit="cover"
                      />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 mr-2"></div>
                  )}
                  <span className="text-sm text-gray-600">{post.author.name}</span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-sm text-gray-500">{formatDate(post.date)}</span>
                </div>

                <h3 className="font-bold text-xl mb-2 text-gray-800">{post.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                
                <Link href={`/blog/${post.slug}`} className="text-blue-600 font-medium inline-flex items-center">
                  Read More
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/blog" className="inline-flex items-center px-5 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition-colors">
            View All Articles
            <svg className="w-4 h-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentBlogPosts;
