import Link from 'next/link';
import Image from 'next/image';
import PostCard from '@/components/common/PostCard';
import connectToDatabase from '@/lib/db';
import { Post, Service } from '@/models';

// This page revalidates every hour
export const revalidate = 3600;

async function getHomeData() {
  await connectToDatabase();
  
  // Get latest published posts
  const posts = await Post.find({ is_published: true })
    .sort({ published_at: -1 })
    .limit(3);
    
  // Get featured services
  const services = await Service.find({ show_in_menu: true })
    .limit(3);
    
  return { 
    posts: JSON.parse(JSON.stringify(posts)),
    services: JSON.parse(JSON.stringify(services))
  };
}

export default async function HomePage() {
  const { posts, services } = await getHomeData();
  
  return (
    <>
      {/* Hero section */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-image.jpg" 
            alt="Animal welfare hero"
            priority
            fill
            className="object-cover opacity-50"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6">
            Help Us Protect Animals
          </h1>
          <p className="text-xl md:text-2xl text-center max-w-3xl mb-10">
            Join our mission to rescue, rehabilitate, and find loving homes for animals in need.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/donate" className="btn-primary py-3 px-8 text-lg font-semibold rounded-md">
              Donate Now
            </Link>
            <Link href="/about" className="bg-white text-gray-900 py-3 px-8 text-lg font-semibold rounded-md hover:bg-gray-100 transition-colors">
              Learn More
            </Link>
          </div>
        </div>
      </section>
      
      {/* Services section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              We are committed to the welfare of animals through these key services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 relative">
                  {service.image ? (
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Link 
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
                  >
                    Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/services" className="btn-secondary">
              View All Services
            </Link>
          </div>
        </div>
      </section>
      
      {/* Impact stats section */}
      <section className="py-16 bg-primary bg-opacity-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Impact</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Together we're making a real difference for animals in need
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-gray-600">Animals Rescued</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-primary mb-2">300+</div>
              <div className="text-gray-600">Adoptions</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <div className="text-gray-600">Volunteers</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-gray-600">Partner Organizations</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Latest blog posts section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Latest News</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with our recent activities and success stories
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-500">No blog posts available yet.</p>
              </div>
            )}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/posts" className="btn-secondary">
              Read All Posts
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Help?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Your donations help us provide food, shelter, medical care, and loving homes for animals in need.
          </p>
          <Link 
            href="/donate"
            className="inline-block bg-white text-primary font-bold py-3 px-8 rounded-md hover:bg-gray-100 transition-colors"
          >
            Make a Donation
          </Link>
        </div>
      </section>
    </>
  );
}
