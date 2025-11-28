## NicheTube MVP Blueprint

### Section A: The Blueprint: Logical Architecture & Data Model

**High-Level Architecture:**
The NicheTube MVP will leverage a serverless architecture, primarily using Firebase for backend services to achieve rapid deployment and low maintenance. User interactions on the React/React Native frontend will trigger API calls to Firebase Functions (Node.js) for business logic and data retrieval. User authentication will be handled by Firebase Authentication. Content data (videos, transcripts) will be stored in Firestore, with the frontend fetching and displaying this data. The core flow involves users signing in, selecting niches, viewing a curated feed, adding videos to a watchlist, setting a time-box, and then playing videos with a static, searchable transcript displayed beforehand.

**Data Model Sketch:**

1.  **Users Collection:**
    *   `userId` (string, primary key from Firebase Auth)
    *   `email` (string)
    *   `selectedNiches` (array of strings, e.g., ["Advanced JavaScript", "Luthier Building Guitar Necks"])
    *   `createdAt` (timestamp)

2.  **Niches Collection:**
    *   `nicheId` (string, auto-generated)
    *   `name` (string, e.g., "Advanced JavaScript")
    *   `description` (string, brief explanation of the niche)
    *   `tags` (array of strings, for broader content categorization)

3.  **Videos Collection:**
    *   `videoId` (string, auto-generated)
    *   `title` (string)
    *   `duration` (number, in seconds)
    *   `nicheId` (string, reference to Niches collection)
    *   `mockVideoUrl` (string, placeholder URL)

4.  **Transcripts Collection:**
    *   `transcriptId` (string, auto-generated)
    *   `videoId` (string, reference to Videos collection)
    *   `content` (string, full transcript text)

5.  **Watchlists Collection:**
    *   `watchlistId` (string, auto-generated)
    *   `userId` (string, reference to Users collection)
    *   `videoIds` (array of strings, references to Videos collection)
    *   `createdAt` (timestamp)

**API Endpoints (MVP):**

1.  `POST /api/users/signup` (Firebase Auth handles login/signup implicitly, this creates user data in Firestore)
    *   Input: `email`, `password`, `selectedNiches`
    *   Output: `userId`

2.  `GET /api/niches`
    *   Input: None
    *   Output: List of available niches (for selection)

3.  `GET /api/videos/feed`
    *   Input: `userId` (implicitly from auth token)
    *   Output: List of videos filtered by user's selected niches (Title, Duration, `videoId`)

4.  `POST /api/watchlists`
    *   Input: `userId` (implicitly from auth token), `videoIds` (array of video IDs to add)
    *   Output: `watchlistId`

5.  `GET /api/videos/:videoId/transcript`
    *   Input: `videoId`
    *   Output: `transcriptContent` (string)

### Section B: Tech Stack Recommendation & Justification

**Recommendation:** Lightweight/Serverless

*   **Frontend:** TypeScript with React Native (for potential future mobile expansion with minimal refactoring)
*   **Backend:** JavaScript (Node.js) with Firebase Functions
*   **Database:** Firebase/Firestore

**Justification:**
This stack is perfectly aligned with the "Speed of Deployment (Low Budget/Maintenance)" priority and the specified scale of 1000 users. Firebase Auth directly addresses user authentication. Firestore is a document database that scales effortlessly and requires minimal setup/maintenance, fitting the low budget and maintenance goals. Firebase Functions provide a serverless backend for business logic, meaning no servers to manage, paying only for execution, which is ideal for an MVP with limited scale. React Native with TypeScript leverages the user's preference while offering a single codebase for web and potential mobile, future-proofing without over-engineering the MVP. This combination adheres rigorously to KISS by minimizing infrastructure overhead and development complexity.

### Section C: Deferred Features (YAGNI List) & KISS Analysis

**KISS Check:**

*   **Most Complex Feature:** "Transcript Display: Full, Searchable Transcript loads before the video player, allowing for content validation/skimming."
    *   **Original Complex Scope:** "Transcript scrolls and highlights text in sync with the video during playback."
    *   **Simplified V1 Scope:** "Static, Searchable Transcript loads first. Keep the search and highlight functionality for skimming, but eliminate time synchronization."
    *   **KISS Implementation:** The user's own simplification perfectly aligns with KISS. Eliminating real-time transcript synchronization with video playback drastically reduces complexity. The initial implementation will focus solely on fetching the full transcript text, displaying it, and providing a basic client-side text search/highlight feature (e.g., using a library like `react-highlight-words`). This satisfies the "content validation/skimming" purpose without requiring intricate video player API integrations or complex state management for synchronization, which are non-MVP features.

**YAGNI Check (Features Deferred to Phase 2):**

1.  **Actual Video Streaming/Hosting:** The MVP will use "Mock Content Integration" with placeholder URLs. Actual video hosting, content ingestion pipelines, and media transcoding are significant undertakings deferred to a later phase once the core value is proven.
2.  **Related Videos/Recommendations:** Explicitly stated as "No related videos," this is a clear YAGNI and a core differentiator.
3.  **Comments, Likes, Social Features:** "No comments, likes, or distractions." These are engagement features, not core to the focused viewing MVP.
4.  **User Profiles / Customization Beyond Niche Selection:** Basic user data is stored, but advanced profile features, settings, or dashboards are beyond MVP.
5.  **Multi-Niche Management:** While users *select* 1-3 niches, the ability to *change* or *manage* these post-creation (beyond a basic update function) is deferred. The focus is on strict adherence.
6.  **Advanced Watchlist Features:** Features like saving multiple watchlists, reordering videos within a watchlist, or sharing watchlists are deferred. The MVP focuses on a single "Focus Watchlist."
7.  **Sophisticated UI/UX animations or transitions:** A minimalist feed is requested, implying that advanced UI polish can wait.

### Section D: Final Summary

The NicheTube MVP will leverage a serverless Firebase backend with a React Native frontend for rapid, cost-effective deployment. It delivers core value by enabling users to select specific niches, consume content within a time-boxed, distraction-free environment, and validate videos via a static, searchable transcript. This lean solution strictly adheres to KISS and YAGNI principles, focusing solely on proving the intentional viewing proposition.