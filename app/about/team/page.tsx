import MuxPlayer from "@mux/mux-player-react";
import jwt from "jsonwebtoken"; // Run 'npm install jsonwebtoken @types/jsonwebtoken' if not installed

// A server-side helper function to sign a private link for the video player
function generateMuxToken(playbackId: string) {
  const signingKeyId = process.env.MUX_SIGNING_KEY_ID;
  const signingKeySecretBase64 = process.env.MUX_SIGNING_KEY_SECRET;
 // const signingKeySecret = Buffer.from(process.env.MUX_SIGNING_KEY_SECRET || '', 'base64');
  
  if (!signingKeyId || !signingKeySecretBase64) {
    throw new Error("Missing Mux environment variables.");
  }

  // Convert the base64 signing secret back into a raw binary buffer
  const privateKey = Buffer.from(signingKeySecretBase64, 'base64');   
 
  // We sign a temporary, 5-minute access token for the video stream
  return jwt.sign(
    {
      sub: playbackId,
      aud: "v", // "v" stands for video, which tells Mux this token is for playback
      exp: Math.floor(Date.now() / 1000) + 5 * 60, // Expires in 5 minutes
      kid: signingKeyId,
    },
    privateKey,
    { algorithm: "RS256" }
  );
}

export default async function Home() {
  const PLAYBACK_ID = process.env.MUX_PLAYBACK_ID; // Replace with your actual signed playback ID
  const token = generateMuxToken(PLAYBACK_ID);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Team</h1>
      
      <p className="mb-6">1. Jay Sarna</p>
      
      <div style={{ maxWidth: "100%", width: "300px" }}>
        <MuxPlayer
          playbackId={PLAYBACK_ID}
          tokens={{ playback: token }}
          streamType="on-demand"
        />
      </div>
	  <br />
	  <br /> 
	  <p style={{ color: 'DodgerBlue' }}>
	    <a href="https://www.inaturalist.org/people/8919073">
	      <u>More</u>
	    </a>
	  </p>

    </div>
  );
}


/*export default async function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1><u>Team</u></h1>
      
      <br /><br /> 1. Jay Sarna
      <video 
        className="auth-img" 
        controls 
        style={{ maxHeight: '100%', width: '300px', height: 'auto' }}
      >
        <source src="/ThankyouGod.mp4" type="video/mp4" alt="Explorer"/>
        Your browser does not support the video tag.
      </video>
	  <br /><br /> <a href="https://www.inaturalist.org/people/8919073">More</a>
    </div>
  );
}
*/

//testConnection();  <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
