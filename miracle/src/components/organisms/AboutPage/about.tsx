import { Container } from '@mui/material';
import Navbar from '../Navbar/navbar';
import { PageHeader } from '../../molecules/layout';
import { StorySection, VideoEmbed } from '../../molecules/about';
import { useEffect, useMemo, useState } from 'react';
import { API_ENDPOINTS } from '../../../constants/api';

const About = () => {
  const storyParagraphs = [
    "At Miracle Root Moringa, we believe true wellness starts with what you feed your body—and your soul. Our journey began with a deep respect for nature's healing power and a mission to share one of the world's most nutrient-rich superfoods with those seeking clean, natural nourishment.",
    "Sourced from the pristine farms of India, our Moringa powder is made from hand-picked leaves, naturally dried, and carefully processed to retain maximum nutrients. It's rich in essential vitamins, minerals, amino acids, and antioxidants—crafted to support your energy, immunity, and overall vitality.",
    "But Miracle Root Moringa is more than just a superfood. It's a commitment to purity, sustainability, and community. We work closely with local farmers, use eco-conscious practices, and uphold the highest standards in quality from soil to shelf.",
    "Whether you're starting your day with a green smoothie or adding a nutritional boost to your wellness routine, Miracle Root Moringa helps you reconnect with the power of nature."
  ];

  const baseUrl = API_ENDPOINTS.BASE_URL;
  const ABOUT_VIDEOS_URL = useMemo(() => `${baseUrl}${API_ENDPOINTS.ABOUT_VIDEOS}`, [baseUrl]);
  const [video, setVideo] = useState<{ id: number; title: string; description?: string; youtube_id?: string; video?: string } | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(ABOUT_VIDEOS_URL);
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setVideo(data[0]); // latest first due to ordering
        } else {
          setVideo(null);
        }
      } catch (e) {
        console.error('Failed to load about videos', e);
      }
    };
    load();
  }, [ABOUT_VIDEOS_URL]);

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{
        py: 8,
        background: 'linear-gradient(to bottom, #f8f9fa, #ffffff)'
      }}>
        <PageHeader 
          title="Our Story"
          subtitle="The Miracle Root Moringa Journey"
        />
        
        <StorySection 
          paragraphs={storyParagraphs}
          conclusion="Join us on a journey to revitalize your body and nourish your soul—naturally."
        />
        
        {(() => {
          const hasUploaded = Boolean(video?.video);
          const hasYouTube = Boolean(video?.youtube_id);
          const title = video?.title || 'Discover the Power of Moringa';
          const description = video?.description || 'Learn more about the amazing benefits of Moringa';
          const streamUrl = hasUploaded ? `${baseUrl}/about-videos/${video!.id}/stream/?v=${Date.now()}` : undefined;
          const videoId = !hasUploaded ? (hasYouTube ? video!.youtube_id! : 'BqFZfQ3no4Y') : undefined;
          return (
            <VideoEmbed
              title={title}
              description={description}
              videoId={videoId}
              videoUrl={streamUrl}
            />
          );
        })()}
      </Container>
    </>
  );
};

export default About;