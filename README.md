<img width="1083" height="650" alt="image" src="https://github.com/user-attachments/assets/1609894a-c493-45d6-a144-16ac2167bf27" />CodeArena

CodeArena is an AI-integrated online coding platform where users can solve programming problems, run and submit their solutions, track submissions, and get AI-powered assistance while solving problems.

The platform also provides an admin system for creating coding problems, validating reference solutions, and managing video editorials.

Why I Built CodeArena ?

While solving coding problems on existing platforms, I often faced difficulties while debugging or understanding why my approach was not working.

Usually, I had to leave the coding platform, open an AI tool such as ChatGPT, and then copy-paste the entire problem statement, my code, test cases, and additional context before asking for help.

This was time-consuming and interrupted the problem-solving flow.

To solve this problem, I integrated an AI coding assistant directly into CodeArena. Since the platform already knows the problem being solved, the problem context can be provided to the AI automatically. This allows users to directly ask questions about their approach, errors, test cases, or doubts without repeatedly copying and pasting the problem and code.

The goal is not just to provide solutions, but to make the debugging and learning process faster and more convenient.

Features
👤 User Authentication
      User registration and login
      Password hashing using bcrypt
      JWT-based authentication
      JWT stored in HTTP-only cookies
      User and admin role-based authorization
      Redis-based JWT token blacklist for logout
      Protected API routes using authentication middleware

💻 Coding Problems
    Browse available coding problems
    View problem descriptions and test cases
    Write code using the Monaco Editor
    Run code against visible test cases
    Submit code against hidden test cases
        Track:
        Submission status
        Passed test cases
        Runtime
        Memory usage
    Mark problems as solved
    View previous submissions for a problem
    
👨‍💻 Admin Features
    Admin-only access to problem management
    Create coding problems
    Add multiple test cases
    Add reference solutions in supported languages
    Validate reference solutions before saving a problem
    Delete problems
    Upload and manage video editorials

⚡ Code Execution

  Code execution is handled using Judge0 rather than running user-submitted code directly on the backend.
  
  The platform supports code execution for languages such as:
  
    C++
    Java
    JavaScript
  
  The system sends code and test cases to Judge0 and processes the returned execution results. For submissions, hidden test cases are used to evaluate the solution.

🤖 AI Coding Assistant

  CodeArena includes an AI assistant powered by Google Gemini.
  
  The AI assistant is integrated directly into the problem-solving page.
  
  Instead of manually providing the entire problem to an external AI tool, CodeArena sends relevant problem context such as:
  
  Problem title
  Problem description
  Test cases
  Starter code
  Conversation history
  
  The user can then ask questions such as:
  
  Why is my approach not working?
  What is wrong with my code?
  Can you explain this error?
  Is my approach correct?
  Can you give me a hint?
  
  The problem context is provided through the AI system instruction, while the frontend maintains the conversation history and sends it with subsequent requests.

🎥 Video Editorials

  Admins can upload video explanations for coding problems.
  
  The video system uses Cloudinary for storage and delivery.
  
  The upload flow is:
  
  Admin selects a video.
  Backend generates a signed Cloudinary upload request.
  Frontend uploads the video directly to Cloudinary.
  Cloudinary returns the uploaded resource information.
  Backend verifies the uploaded resource.
  Only the required video metadata is stored in MongoDB.
  Cloudinary is used for video delivery and thumbnail generation.
  
  This avoids sending large video files through the application server.

--------------------------------------------------------------------------------------------------------------------------------------------------------------------
Tech Stack

Frontend
  React.js
  Redux Toolkit
  React Router
  Tailwind CSS
  DaisyUI
  React Hook Form
  Zod
  Monaco Editor
  Axios
  Lucide React
  Vite


Backend
  Node.js
  Express.js
  MongoDB
  Mongoose
  Redis
  JWT
  bcrypt
  Axios
  Zod
  CORS
  cookie-parser
  dotenv


External Services
Judge0 — Code execution
Google Gemini — AI coding assistant
Cloudinary — Video storage, delivery and transformations
System Architecture
                         +-----------------------------------+
                         |           Client Side             |
                         |                                   |
                         | React + Redux Toolkit             |
                         | Tailwind + React Router            |
                         | Monaco Editor + Axios             |
                         +-----------------+-----------------+
                                           |
                                    HTTP / REST API
                                    + Cookies
                                           |
                                           v
              +---------------------------------------------------+
              |                  Express Server                    |
              |                                                   |
              | Authentication / Authorization                    |
              | User Routes / Problem Routes / Submission Routes |
              | AI Routes / Video Routes                          |
              +--------------------------+------------------------+
                                         |
          +------------------------------+------------------------------+
          |              |               |              |              |
          v              v               v              v              v
   +------------+  +------------+  +------------+  +------------+  +------------+
   |  MongoDB   |  |   Redis    |  |   Judge0   |  |   Gemini   |  | Cloudinary |
   |            |  |            |  |            |  |            |  |            |
   | Users      |  | JWT Token  |  | Code       |  | AI Doubt   |  | Video      |
   | Problems   |  | Blacklist  |  | Execution  |  | Solver     |  | Storage    |
   | Submission |  |            |  |            |  | Chat       |  | Delivery   |
   | Video Meta |  | token:<JWT>|  | Test Cases |  | Assistant  |  | Thumbnail  |
   +------------+  +------------+  +------------+  +------------+  +------------+

📖 Detailed Documentation

For a detailed explanation of the project's architecture, authentication, Judge0 code execution, AI integration, Cloudinary video system, database design, and implementation details:

https://docs.google.com/document/d/1KvpT21GaymU0ostkqnyOq0e8CGj3Qh3yDLaci0JofjU/edit?usp=sharing




-------------------------------------------------------------------------------------------------------------------------------------------------------------------
