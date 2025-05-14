import Link from 'next/link';
import Image from 'next/image';
import PostCard from '@/components/common/PostCard';
import connectToDatabase from '@/lib/db';
import { Post, Service, NGOSettings } from '@/lib/models';

export const revalidate = 3600; // Revalidate this page every hour

async function getHomeData() {
  try {
    await connectToDatabase();
    
    // Get NGO settings
    const ngoSettings = await NGOSettings.findOne() || {
      name: 'Animal Welfare NGO'
    };
    
    // Get featured posts
    const posts = await Post.find({ is_published: true })
      .sort({ published_at: -1 })
      .limit(3);
    
    // Get services
    const services = await Service.find({ show_in_menu: true })
      .limit(3);
    
    return { ngoSettings, posts, services };
  } catch (error) {
    console.error('Failed to fetch home data:', error);
    return { 
      ngoSettings: { name: 'Animal Welfare NGO' },
      posts: [],
      services: []
    };
  }
}

export default async function Home() {
  const { ngoSettings, posts, services } = await getHomeData();
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-96 md:h-[600px] flex items-center justify-center bg-gray-900">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-image.jpg" 
            alt="Animal Welfare"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
            className="opacity-60"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Help Us Protect Animals
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Join our mission to rescue, rehabilitate, and find loving homes for animals in need.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/donate" className="btn-primary text-lg py-3 px-8">
              Donate Now
            </Link>
            <Link href="/about" className="btn-secondary text-lg py-3 px-8">
              Learn More
            </Link>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
            <p className="mt-4 text-lg text-gray-600">
              How we make a difference in the lives of animals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service._id} className="card hover:shadow-lg transition duration-200">
                <div className="h-48 relative w-full">
                  {service.image ? (
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div className="h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Link 
                    href={`/services/${service.slug}`} 
                    className="text-primary hover:text-primary-dark font-medium flex items-center"
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
          
          <div className="text-center mt-10">
            <Link href="/services" className="btn-secondary">
              View All Services
            </Link>
          </div>
        </div>
      </section>
      
      {/* Impact Stats Section */}
      <section className="py-16 bg-primary bg-opacity-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Impact</h2>
            <p className="mt-4 text-lg text-gray-600">
              Together we can make a difference
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-xl text-gray-700">Animals Rescued</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">300+</div>
              <div className="text-xl text-gray-700">Adoptions</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">1000+</div>
              <div className="text-xl text-gray-700">Volunteers</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Latest Posts Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Latest News</h2>
            <p className="mt-4 text-lg text-gray-600">
              Stay updated with our recent activities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link href="/posts" className="btn-secondary">
              View All Posts
            </Link>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Help?</h2>
          <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Your donations help us provide food, shelter, medical care, and loving homes for animals in need.
          </p>
          <Link href="/donate" className="inline-block bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-200">
            Make a Donation
          </Link>
        </div>
      </section>
    </div>
  );
}
