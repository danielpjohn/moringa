import { Box, Typography, useTheme } from '@mui/material';

interface VideoEmbedProps {
  title: string;
  description?: string;
  className?: string;
  videoId?: string;      // YouTube id
  videoUrl?: string;     // Direct URL to mp4/webm, etc.
}

const VideoEmbed = ({ videoId, videoUrl, title, description, className = "" }: VideoEmbedProps) => {
  const theme = useTheme();
  
  return (
    <Box sx={{
      my: 6,
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
    }} className={className}>
      <Typography variant="h5" component="h3" sx={{
        textAlign: 'center',
        mb: 2,
        color: theme.palette.primary.dark,
        fontWeight: 'bold'
      }}>
        {title}
      </Typography>
      <Box sx={{
        position: 'relative',
        paddingBottom: '56.25%', // 16:9 aspect ratio
        height: 0,
        overflow: 'hidden'
      }}>
        {videoUrl ? (
          <video
            controls
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none'
            }}
            src={videoUrl}
          />
        ) : (
          <iframe
            width="100%"
            height="100%"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none'
            }}
            src={`https://www.youtube.com/embed/${videoId || ''}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </Box>
      {description && (
        <Typography variant="body2" sx={{
          textAlign: 'center',
          mt: 1,
          color: theme.palette.grey[600],
          fontStyle: 'italic'
        }}>
          {description}
        </Typography>
      )}
    </Box>
  );
};

export default VideoEmbed;
