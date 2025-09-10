// Simple script to check if the environment is set up correctly
console.log("=== AI Transaction Classifier - Setup Check ===");

// Check if we're in a browser environment
if (typeof window !== 'undefined') {
  console.log("✓ Running in browser environment");
  
  // Check for API key
  const apiKey = import.meta.env.VITE_API_KEY;
  if (apiKey && apiKey !== 'PASTE_YOUR_SECRET_KEY_HERE') {
    console.log("✓ API key is set");
  } else {
    console.log("⚠ API key is not set or is the default placeholder");
    console.log("  Please set your Google AI Studio API key in the .env file");
  }
  
  // Check for required globals
  if (typeof XLSX !== 'undefined') {
    console.log("✓ XLSX library is loaded");
  } else {
    console.log("⚠ XLSX library is not loaded");
  }
  
} else {
  console.log("⚠ This script should be run in the browser");
}

console.log("=== Setup Check Complete ===");