"use client";
import {
  Video,
  Code,
  Phone,
  Zap,
  Brain,
  Workflow,
  ListChecks,
  RefreshCw,
} from "lucide-react";
import { useRef } from "react";
import { AnimatedBeam } from "@/components/ui/animated-beam";

export default function ConnectedWorkflow() {
  const containerRef = useRef(null);
  const meetingRef = useRef(null);
  const codeReviewRef = useRef(null);
  const supportRef = useRef(null);
  const hubRef = useRef(null);
  const connectedRef = useRef(null);
  const notionRef = useRef(null);
  const openaiRef = useRef(null);
  const supabaseRef = useRef(null);
  const slackRef = useRef(null);

  return (
    <div
      className="relative my-12 flex items-center  justify-start md:justify-center gap-24 h-full md:min-h-[400px] w-full p-4"
      style={{ minWidth: "1200px" }}
      ref={containerRef}
    >
      {/* Left Side - Use Cases */}
      <div className="flex flex-col gap-12">
        {/* Integration Hub */}
        <div
          ref={meetingRef}
          className="flex rounded-sm z-20 text-xs border border-neutral-700 bg-neutral-900 px-3 py-1  items-center gap-2"
        >
          <Workflow className="h-3 w-3 text-purple-400" />
          <span className="text-xs font-medium dark:text-neutral-200">
            Unifies every tool in your stack
          </span>
        </div>

        {/* Task Management */}
        <div
          ref={codeReviewRef}
          className="flex rounded-sm z-20 text-xs border border-neutral-700 bg-neutral-900 px-3 py-1 items-center gap-2"
        >
          <ListChecks className="h-3 w-3 text-blue-400" />
          <span className="text-xs font-medium dark:text-neutral-200">
            Orchestrates tasks automatically
          </span>
        </div>

        {/* Real-time Sync */}
        <div
          ref={supportRef}
          className="flex rounded-sm z-20  border border-neutral-700 bg-neutral-900 px-3 py-1 items-center gap-2"
        >
          <RefreshCw className="h-3 w-3 text-cyan-400" />
          <span className="text-xs font-medium dark:text-neutral-200">
            Syncs everything in real-time
          </span>
        </div>
      </div>

      {/* Center Hub */}
      <div
        ref={hubRef}
        className="flex h-16 w-16 z-20 shrink-0 items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800 shadow-lg"
      >
        <div className="relative h-16 w-16 overflow-hidden rounded-md bg-gray-200 p-px shadow-xl dark:bg-neutral-700">
          <div className="absolute inset-0 scale-[1.4] animate-spin rounded-full bg-conic [background-image:conic-gradient(at_center,transparent,var(--color-blue-500)_20%,transparent_30%)] [animation-duration:2s]"></div>
          <div className="absolute inset-0 scale-[1.4] animate-spin rounded-full [background-image:conic-gradient(at_center,transparent,var(--color-brand)_20%,transparent_30%)] [animation-delay:1s] [animation-duration:2s]"></div>
          <div className="relative z-20 flex h-full w-full items-center justify-center rounded-md bg-white dark:bg-neutral-900">
            <img
              src="https://1j8rp7fkdq62hja2.public.blob.vercel-storage.com/Plugin%20icon%20-%202%20%281%29.png"
              className="w-fit rounded-md h-fit"
              alt=""
            />
          </div>
        </div>
        <p className="absolute bottom-20 md:bottom-48 text-xs">Our Ai</p>
      </div>

      {/* Connected Badge */}
      <div
        ref={connectedRef}
        className="rounded-md border z-20 border-blue-500 bg-blue-500/40 px-3 py-1 text-xs font-medium text-white shadow-lg"
      >
        Connected
      </div>

      {/* Right Side - Tools in Cross Pattern */}
      <div className="relative flex items-center">
        {/* Vertical Column - Left Side */}
        <div className="flex flex-col items-center gap-16">
          {/* Notion - Top */}
          <div
            ref={notionRef}
            className="flex h-14 w-14 z-20 items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800 shadow-lg"
          >
            <svg
              className="h-6 w-6 text-white"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.25781 3.11684C3.67771 3.45796 3.83523 3.43193 4.62369 3.37933L12.0571 2.93299C12.2147 2.93299 12.0836 2.77571 12.0311 2.74957L10.7965 1.85711C10.56 1.67347 10.2448 1.46315 9.64083 1.51576L2.44308 2.04074C2.18059 2.06677 2.12815 2.19801 2.2327 2.30322L3.25781 3.11684ZM3.7041 4.84917V12.6704C3.7041 13.0907 3.91415 13.248 4.38693 13.222L12.5562 12.7493C13.0292 12.7233 13.0819 12.4341 13.0819 12.0927V4.32397C13.0819 3.98306 12.9508 3.79921 12.6612 3.82545L4.12422 4.32397C3.80918 4.35044 3.7041 4.50803 3.7041 4.84917ZM11.7688 5.26872C11.8212 5.50518 11.7688 5.74142 11.5319 5.76799L11.1383 5.84641V11.6205C10.7965 11.8042 10.4814 11.9092 10.2188 11.9092C9.79835 11.9092 9.69305 11.7779 9.37812 11.3844L6.80345 7.34249V11.2532L7.61816 11.437C7.61816 11.437 7.61816 11.9092 6.96086 11.9092L5.14879 12.0143C5.09615 11.9092 5.14879 11.647 5.33259 11.5944L5.80546 11.4634V6.29276L5.1489 6.24015C5.09625 6.00369 5.22739 5.66278 5.5954 5.63631L7.53935 5.50528L10.2188 9.5998V5.97765L9.53564 5.89924C9.4832 5.61018 9.69305 5.40028 9.95576 5.37425L11.7688 5.26872ZM1.83874 1.33212L9.32557 0.780787C10.245 0.701932 10.4815 0.754753 11.0594 1.17452L13.4492 2.85424C13.8436 3.14309 13.975 3.22173 13.975 3.53661V12.7493C13.975 13.3266 13.7647 13.6681 13.0293 13.7203L4.33492 14.2454C3.78291 14.2717 3.52019 14.193 3.23111 13.8253L1.47116 11.5419C1.1558 11.1216 1.02466 10.8071 1.02466 10.4392V2.25041C1.02466 1.77825 1.23504 1.38441 1.83874 1.33212Z"
                fill="currentColor"
              />
            </svg>
          </div>

          {/* Supabase - Bottom */}
          <div
            ref={supabaseRef}
            className="flex h-14 w-14 z-20 items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800 shadow-lg"
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 30 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.0678 30.0015C16.3014 30.9666 14.7475 30.4379 14.729 29.2055L14.459 11.1809H26.5787C28.7739 11.1809 29.9982 13.7164 28.6332 15.4356L17.0678 30.0015Z"
                fill="#3ECF8E"
              />
              <path
                d="M12.1392 0.998475C12.9056 0.0332315 14.4596 0.562115 14.478 1.79448L14.5964 19.8191H2.62832C0.433044 19.8191 -0.791301 17.2836 0.573786 15.5643L12.1392 0.998475Z"
                fill="#3ECF8E"
              />
            </svg>
          </div>
        </div>

        {/* Horizontal Row - Right Side */}
        <div className="ml-16 flex items-center gap-16">
          {/* Slack - Left of horizontal row */}
          <div
            ref={slackRef}
            className="flex h-14 w-14 z-20 items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800 shadow-lg"
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.0318 8.08621C3.0318 8.78366 2.46811 9.34735 1.77066 9.34735C1.07321 9.34735 0.509521 8.78366 0.509521 8.08621C0.509521 7.38876 1.07321 6.82507 1.77066 6.82507H3.0318V8.08621Z"
                fill="#E01E5A"
              />
              <path
                d="M3.66235 8.08621C3.66235 7.38876 4.22604 6.82507 4.92349 6.82507C5.62094 6.82507 6.18463 7.38876 6.18463 8.08621V11.2391C6.18463 11.9365 5.62094 12.5002 4.92349 12.5002C4.22604 12.5002 3.66235 11.9365 3.66235 11.2391L3.66235 8.08621Z"
                fill="#E01E5A"
              />
              <path
                d="M4.92374 3.02253C4.22629 3.02253 3.6626 2.45883 3.6626 1.76139C3.6626 1.06394 4.22629 0.500244 4.92374 0.500244C5.62119 0.500244 6.18488 1.06394 6.18488 1.76139V3.02253H4.92374Z"
                fill="#36C5F0"
              />
              <path
                d="M4.92355 3.66284C5.621 3.66284 6.18469 4.22653 6.18469 4.92398C6.18469 5.62143 5.621 6.18512 4.92355 6.18512H1.76114C1.06369 6.18512 0.5 5.62143 0.5 4.92398C0.5 4.22653 1.06369 3.66284 1.76114 3.66284L4.92355 3.66284Z"
                fill="#36C5F0"
              />
              <path
                d="M9.97852 4.92386C9.97852 4.22641 10.5422 3.66272 11.2397 3.66272C11.9371 3.66272 12.5008 4.22641 12.5008 4.92386C12.5008 5.62131 11.9371 6.185 11.2397 6.185H9.97852V4.92386Z"
                fill="#2EB67D"
              />
              <path
                d="M9.34723 4.92379C9.34723 5.62124 8.78354 6.18493 8.08609 6.18493C7.38864 6.18493 6.82495 5.62124 6.82495 4.92379V1.76139C6.82495 1.06394 7.38864 0.500244 8.08609 0.500244C8.78354 0.500244 9.34723 1.06394 9.34723 1.76139V4.92379Z"
                fill="#2EB67D"
              />
              <path
                d="M8.08609 9.97803C8.78354 9.97803 9.34723 10.5417 9.34723 11.2392C9.34723 11.9366 8.78354 12.5003 8.08609 12.5003C7.38864 12.5003 6.82495 11.9366 6.82495 11.2392V9.97803H8.08609Z"
                fill="#ECB22E"
              />
              <path
                d="M8.08609 9.34735C7.38864 9.34735 6.82495 8.78366 6.82495 8.08621C6.82495 7.38876 7.38864 6.82507 8.08609 6.82507H11.2485C11.9459 6.82507 12.5096 7.38876 12.5096 8.08621C12.5096 8.78366 11.9459 9.34735 11.2485 9.34735H8.08609Z"
                fill="#ECB22E"
              />
            </svg>
          </div>

          {/* OpenAI - Right of horizontal row */}
          <div
            ref={openaiRef}
            className="flex h-14 w-14 z-20 items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800 shadow-lg"
          >
            <svg
              className="h-6 w-6 text-white"
              viewBox="0 0 29 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.435287 17.7181C0.373 17.4525 0.689403 17.2853 0.882285 17.4782L11.1053 27.7021C11.2981 27.895 11.1309 28.2114 10.8653 28.1491C5.70614 26.9386 1.6453 22.8773 0.435287 17.7181ZM0.092903 13.6206C0.0879588 13.7 0.117779 13.7774 0.173973 13.8336L14.7497 28.4108C14.8059 28.467 14.8834 28.4969 14.9627 28.4919C15.6261 28.4506 16.277 28.3631 16.9122 28.2327C17.1262 28.1888 17.2006 27.9258 17.0461 27.7713L0.813742 11.5373C0.659228 11.3828 0.396218 11.4571 0.352246 11.6712C0.221759 12.3064 0.134254 12.9573 0.092903 13.6206ZM1.27167 8.80927C1.22505 8.91393 1.24879 9.03623 1.3298 9.11727L19.4662 27.2554C19.5472 27.3365 19.6695 27.3602 19.7742 27.3136C20.2743 27.0909 20.759 26.8397 21.2262 26.5622C21.3808 26.4703 21.4046 26.2579 21.2775 26.1308L2.45467 7.30609C2.32753 7.17893 2.11511 7.20278 2.02326 7.35736C1.74567 7.8245 1.49445 8.30917 1.27167 8.80927ZM3.63721 5.55259C3.53358 5.44896 3.52718 5.28275 3.62482 5.17344C6.19119 2.3006 9.92421 0.492182 14.0795 0.492385C21.819 0.492765 28.0927 6.76711 28.0923 14.5065C28.0921 18.6619 26.2833 22.3947 23.4102 24.9608C23.301 25.0584 23.1347 25.052 23.0311 24.9484L3.63721 5.55259Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Animated Beams */}
      {/* Left side beams - appear first with staggered delay */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={meetingRef}
        toRef={hubRef}
        curvature={0}
        delay={0.2}
        duration={1.5}
        pathOpacity={0.3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={codeReviewRef}
        toRef={hubRef}
        curvature={0}
        delay={0.4}
        duration={1.5}
        pathOpacity={0.3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={supportRef}
        toRef={hubRef}
        curvature={0}
        delay={0.6}
        duration={1.5}
        pathOpacity={0.3}
      />
      {/* Center connection - hub to connected badge */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={hubRef}
        toRef={connectedRef}
        curvature={0}
        reverse
        delay={0.8}
        duration={1.2}
        pathOpacity={0.3}
      />
      {/* Right side beams - appear last with cross pattern animation */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={connectedRef}
        toRef={notionRef}
        curvature={0}
        reverse
        delay={1.0}
        duration={1.5}
        pathOpacity={0.3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={connectedRef}
        toRef={slackRef}
        curvature={0}
        reverse
        delay={1.2}
        duration={1.5}
        pathOpacity={0.3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={connectedRef}
        toRef={supabaseRef}
        curvature={0}
        reverse
        delay={1.4}
        duration={1.5}
        pathOpacity={0.3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={connectedRef}
        toRef={openaiRef}
        curvature={0}
        reverse
        delay={1.6}
        duration={1.5}
        pathOpacity={0.3}
      />
    </div>
  );
}
