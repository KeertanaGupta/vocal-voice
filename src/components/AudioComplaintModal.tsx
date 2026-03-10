import { useState, useRef, useCallback, useEffect } from "react";
import { Mic, Square, Loader2, X, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface AudioComplaintModalProps {
  open: boolean;
  onClose: () => void;
  onExtracted: (data: ExtractedComplaint) => void;
}

export interface ExtractedComplaint {
  title: string;
  description: string;
  category: string;
  priority: string;
  location: string;
}

type RecordingState = "idle" | "recording" | "processing" | "extracted";

export function AudioComplaintModal({ open, onClose, onExtracted }: AudioComplaintModalProps) {
  const [state, setState] = useState<RecordingState>("idle");
  const [transcript, setTranscript] = useState("");
  const [duration, setDuration] = useState(0);
  const [waveformData, setWaveformData] = useState<number[]>(new Array(40).fill(0));
  const [extractedData, setExtractedData] = useState<ExtractedComplaint | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const cleanup = useCallback(() => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close();
    }
    mediaRecorderRef.current = null;
    audioContextRef.current = null;
    analyserRef.current = null;
  }, []);

  useEffect(() => {
    if (!open) {
      cleanup();
      setState("idle");
      setTranscript("");
      setDuration(0);
      setWaveformData(new Array(40).fill(0));
      setExtractedData(null);
      chunksRef.current = [];
    }
  }, [open, cleanup]);

  const updateWaveform = useCallback(() => {
    if (!analyserRef.current) return;
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);

    const bars = 40;
    const step = Math.floor(dataArray.length / bars);
    const newData = Array.from({ length: bars }, (_, i) => {
      const value = dataArray[i * step] || 0;
      return value / 255;
    });
    setWaveformData(newData);
    animationRef.current = requestAnimationFrame(updateWaveform);
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        processAudio();
      };

      mediaRecorder.start(250);
      setState("recording");
      setDuration(0);

      timerRef.current = window.setInterval(() => {
        setDuration((d) => d + 1);
      }, 1000);

      updateWaveform();
    } catch {
      toast.error("Microphone access denied. Please allow microphone access.");
    }
  };

  const stopRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    setWaveformData(new Array(40).fill(0));
  };

  const processAudio = () => {
    setState("processing");

    // Simulate AI transcription + entity extraction
    // In production, this would call the Lovable AI edge function
    setTimeout(() => {
      const sampleTranscript =
        "MG Road par paani ki pipeline toot gayi hai. Block C ke paas bahut zyada paani beh raha hai. Lagbhag 200 se zyada ghar prabhavit hain. Yeh Sector 15 mein hai. Please jaldi se jaldi repair karein.";
      setTranscript(sampleTranscript);

      setTimeout(() => {
        const extracted: ExtractedComplaint = {
          title: "Broken water pipeline on MG Road",
          description:
            "Water pipeline burst near Block C on MG Road. Excessive water flowing, approximately 200+ households affected. Located in Sector 15. Urgent repair needed.",
          category: "Water Supply",
          priority: "Critical",
          location: "MG Road, Block C, Sector 15",
        };
        setExtractedData(extracted);
        setState("extracted");
      }, 1500);
    }, 2000);
  };

  const handleConfirm = () => {
    if (extractedData) {
      onExtracted(extractedData);
      onClose();
      toast.success("Complaint form populated from voice recording");
    }
  };

  const formatDuration = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg rounded-lg border border-border bg-card p-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
              <Mic className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">Voice Complaint Intake</h2>
              <p className="text-xs text-muted-foreground">Speak in Hindi or English</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Waveform Visualization */}
        <div className="mb-6 flex h-24 items-end justify-center gap-[3px] rounded-md border border-border bg-background p-4">
          {waveformData.map((v, i) => (
            <div
              key={i}
              className={`w-1.5 rounded-full transition-all duration-75 ${
                state === "recording" ? "bg-primary" : "bg-border"
              }`}
              style={{
                height: `${Math.max(4, v * 64)}px`,
                opacity: state === "recording" ? 0.4 + v * 0.6 : 0.3,
              }}
            />
          ))}
        </div>

        {/* Timer */}
        {(state === "recording" || state === "processing") && (
          <div className="mb-4 text-center">
            <p className="font-mono text-2xl font-semibold text-foreground">
              {formatDuration(duration)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {state === "recording" ? "Recording..." : "Processing audio..."}
            </p>
          </div>
        )}

        {/* Controls */}
        {state === "idle" && (
          <div className="flex justify-center mb-4">
            <button
              onClick={startRecording}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105"
            >
              <Mic className="h-6 w-6" />
            </button>
          </div>
        )}

        {state === "recording" && (
          <div className="flex justify-center mb-4">
            <button
              onClick={stopRecording}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive text-destructive-foreground transition-all hover:bg-destructive/90"
            >
              <Square className="h-5 w-5" />
            </button>
          </div>
        )}

        {state === "processing" && (
          <div className="flex justify-center mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
              <Loader2 className="h-6 w-6 text-primary animate-spin" />
            </div>
          </div>
        )}

        {/* Transcript */}
        {transcript && (
          <div className="mb-4 rounded-md border border-border bg-background p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Transcription
              </span>
              {state === "processing" && (
                <Loader2 className="h-3 w-3 text-primary animate-spin" />
              )}
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">{transcript}</p>
          </div>
        )}

        {/* Extracted Data */}
        {extractedData && state === "extracted" && (
          <div className="mb-4 rounded-md border border-primary/30 bg-primary/5 p-4 space-y-3 animate-fade-in">
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium uppercase tracking-wider text-primary">
                AI Extracted Fields
              </span>
            </div>

            <div className="space-y-2">
              {([
                ["Title", extractedData.title],
                ["Category", extractedData.category],
                ["Priority", extractedData.priority],
                ["Location", extractedData.location],
              ] as const).map(([label, val]) => (
                <div key={label} className="flex items-start gap-3">
                  <span className="w-16 flex-shrink-0 text-xs text-muted-foreground">{label}</span>
                  <span className="text-sm text-foreground font-medium">{val}</span>
                </div>
              ))}
              <div className="flex items-start gap-3">
                <span className="w-16 flex-shrink-0 text-xs text-muted-foreground">Desc</span>
                <span className="text-xs text-foreground/80 leading-relaxed">
                  {extractedData.description}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={onClose}
                className="h-8 rounded-md border border-border bg-secondary px-4 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Discard
              </button>
              <button
                onClick={handleConfirm}
                className="h-8 rounded-md bg-primary px-4 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Use in Form
              </button>
            </div>
          </div>
        )}

        {/* Instructions */}
        {state === "idle" && (
          <p className="text-center text-xs text-muted-foreground">
            Click the microphone to start recording. Speak your complaint in Hindi or English.
            <br />
            Our AI will automatically extract title, category, priority, and location.
          </p>
        )}
      </div>
    </div>
  );
}
