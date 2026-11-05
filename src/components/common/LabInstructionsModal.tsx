import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './LabInstructionsModal.css';
import {
  LabInstructionPost,
  LabInstructionScript,
  LabInstructionLink,
  LabInstructionTarget
} from '../../types/labInstruction';
import { labInstructionService } from '../../services/labInstructionService';
import { authService, ADMIN_AUTHORIZED_EMAIL } from '../../services/authService';
import { soundService } from '../../services/soundService';
import {
  ClipboardList,
  Calendar,
  Clock,
  Pin,
  Plus,
  Edit3,
  Trash2,
  ArrowLeft,
  Copy,
  Check,
  Play,
  Image as ImageIcon,
  Code2,
  Link as LinkIcon,
  ExternalLink,
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Sparkles,
  X,
  Maximize2,
  Minimize2,
  PanelRightOpen,
  Search,
  Eye,
  Upload,
  Globe,
  FileCode2,
  ChevronRight
} from 'lucide-react';

interface LabInstructionsModalProps {
  labType: 'sql' | 'kotlin';
  userUid: string;
  userEmail?: string;
  userName?: string;
  isOpen: boolean;
  onClose: () => void;
  onLoadScriptToEditor?: (code: string, title: string, language: 'sql' | 'kotlin') => void;
}

/**
 * Formatea una fecha mostrando si es de HOY y la fecha/hora legible
 */
export function formatInstructionDate(timestamp: number): {
  isToday: boolean;
  shortLabel: string;
  fullLabel: string;
  timeLabel: string;
} {
  const date = new Date(timestamp);
  const now = new Date();
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const timeLabel = date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const datePart = date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const fullDatePart = date.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return {
    isToday,
    shortLabel: isToday ? `HOY • ${datePart}` : datePart,
    fullLabel: isToday
      ? `Publicado hoy (${fullDatePart}) a las ${timeLabel}`
      : `Publicado el ${fullDatePart} a las ${timeLabel}`,
    timeLabel
  };
}

export function getTodayHeaderString(): string {
  const now = new Date();
  const formatted = now.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

/**
 * Renderizador de texto enriquecido (Títulos, Subtítulos, Negrita, Cursiva, Subrayado, Código, Links, Listas)
 */
const RichPostContent: React.FC<{ content: string }> = ({ content }) => {
  const renderInlineFormatting = (text: string): React.ReactNode[] => {
    // Tokenizar links markdown [label](url), URLs sueltas, **bold**, __underline__, *italic*, `code`
    const pattern =
      /(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\))|(https?:\/\/[^\s<]+)|(\*\*([^*]+)\*\*)|(__([^_]+)__)|(\*([^*]+)\*)|(`([^`]+)`)/g;

    const nodes: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(text)) !== null) {
      if (match.index > lastIndex) {
        nodes.push(text.slice(lastIndex, match.index));
      }

      if (match[1]) {
        // [label](url)
        nodes.push(
          <a
            key={match.index}
            href={match[3]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-bold text-sky-600 underline decoration-2 hover:text-sky-800 break-all"
            onClick={e => e.stopPropagation()}
          >
            {match[2]}
            <ExternalLink size={12} className="inline flex-shrink-0" />
          </a>
        );
      } else if (match[4]) {
        // Direct URL
        nodes.push(
          <a
            key={match.index}
            href={match[4]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-bold text-sky-600 underline decoration-2 hover:text-sky-800 break-all"
            onClick={e => e.stopPropagation()}
          >
            {match[4]}
            <ExternalLink size={12} className="inline flex-shrink-0" />
          </a>
        );
      } else if (match[5]) {
        // **bold**
        nodes.push(
          <strong key={match.index} className="font-black text-slate-900">
            {match[6]}
          </strong>
        );
      } else if (match[7]) {
        // __underline__
        nodes.push(
          <u key={match.index} className="underline decoration-2 underline-offset-2 font-semibold">
            {match[8]}
          </u>
        );
      } else if (match[9]) {
        // *italic*
        nodes.push(
          <em key={match.index} className="italic text-slate-800">
            {match[10]}
          </em>
        );
      } else if (match[11]) {
        // `code`
        nodes.push(
          <code
            key={match.index}
            className="px-1.5 py-0.5 mx-0.5 text-xs font-mono font-bold bg-amber-100 text-slate-900 border border-slate-900 rounded"
          >
            {match[12]}
          </code>
        );
      }

      lastIndex = pattern.lastIndex;
    }

    if (lastIndex < text.length) {
      nodes.push(text.slice(lastIndex));
    }

    return nodes;
  };

  const lines = content.split(/\r?\n/);

  return (
    <div className="space-y-2.5 text-slate-800 leading-relaxed text-[15px]">
      {lines.map((rawLine, idx) => {
        const line = rawLine.trimEnd();
        const trimmed = line.trim();

        if (!trimmed) {
          return <div key={idx} className="h-2" />;
        }

        // # Título principal
        if (trimmed.startsWith('# ')) {
          return (
            <h2
              key={idx}
              className="text-xl font-black text-slate-900 pt-2 pb-1 border-b-2 border-slate-200 tracking-tight"
            >
              {renderInlineFormatting(trimmed.slice(2))}
            </h2>
          );
        }

        // ## Subtítulo
        if (trimmed.startsWith('## ')) {
          return (
            <h3
              key={idx}
              className="text-lg font-extrabold text-slate-900 pt-1.5 flex items-center gap-2"
            >
              <span className="w-2 h-5 bg-sky-500 rounded-sm border border-black inline-block flex-shrink-0" />
              <span>{renderInlineFormatting(trimmed.slice(3))}</span>
            </h3>
          );
        }

        // ### Subsección
        if (trimmed.startsWith('### ')) {
          return (
            <h4 key={idx} className="text-base font-bold text-slate-900 pt-1">
              {renderInlineFormatting(trimmed.slice(4))}
            </h4>
          );
        }

        // > Nota / Cita destacada
        if (trimmed.startsWith('> ')) {
          return (
            <div
              key={idx}
              className="p-3 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg text-slate-800 font-medium text-sm shadow-sm"
            >
              {renderInlineFormatting(trimmed.slice(2))}
            </div>
          );
        }

        // Lista con viñetas (- o • o *)
        if (/^[-•]\s+/.test(trimmed)) {
          return (
            <div key={idx} className="flex items-start gap-2.5 pl-2">
              <span className="w-2 h-2 rounded-full bg-slate-900 mt-2 flex-shrink-0" />
              <div className="flex-1">{renderInlineFormatting(trimmed.replace(/^[-•]\s+/, ''))}</div>
            </div>
          );
        }

        // Lista numerada (1. , 2. )
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start gap-2.5 pl-1">
              <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1 text-xs font-black bg-sky-100 text-sky-900 border border-slate-900 rounded-md mt-0.5 flex-shrink-0">
                {numMatch[1]}
              </span>
              <div className="flex-1">{renderInlineFormatting(numMatch[2])}</div>
            </div>
          );
        }

        return (
          <p key={idx} className="text-slate-800 whitespace-pre-wrap">
            {renderInlineFormatting(line)}
          </p>
        );
      })}
    </div>
  );
};

export const LabInstructionsModal: React.FC<LabInstructionsModalProps> = ({
  labType,
  userUid,
  userEmail,
  userName,
  isOpen,
  onClose,
  onLoadScriptToEditor
}) => {
  const isAdmin =
    authService.isCurrentUserAdmin() ||
    Boolean(userEmail && userEmail.toLowerCase() === ADMIN_AUTHORIZED_EMAIL.toLowerCase());

  const [posts, setPosts] = useState<LabInstructionPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<LabInstructionPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedScriptId, setCopiedScriptId] = useState<string | null>(null);
  const [loadedScriptId, setLoadedScriptId] = useState<string | null>(null);
  const [zoomImageUrl, setZoomImageUrl] = useState<string | null>(null);

  // Modo acoplado / flotante para que el alumno pueda leer la publicación mientras programa en el lab
  const [isFloatingMode, setIsFloatingMode] = useState(false);
  const [isFloatingCollapsed, setIsFloatingCollapsed] = useState(false);

  // Estado del Editor del Profesor (Crear / Editar publicación)
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [formLabType, setFormLabType] = useState<LabInstructionTarget>(labType);
  const [formTitle, setFormTitle] = useState('');
  const [formSubtitle, setFormSubtitle] = useState('');
  const [formSummary, setFormSummary] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formPinned, setFormPinned] = useState(false);
  const [formImages, setFormImages] = useState<string[]>([]);
  const [formImageUrlInput, setFormImageUrlInput] = useState('');
  const [formScripts, setFormScripts] = useState<LabInstructionScript[]>([]);
  const [formLinks, setFormLinks] = useState<LabInstructionLink[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isPreviewTab, setIsPreviewTab] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);
  const imageFileInputRef = useRef<HTMLInputElement>(null);

  // Suscripción en tiempo real a las instrucciones de este laboratorio
  useEffect(() => {
    const unsubscribe = labInstructionService.subscribeToInstructions(labType, updatedPosts => {
      setPosts(updatedPosts);
      if (selectedPost) {
        const refreshed = updatedPosts.find(p => p.id === selectedPost.id);
        if (refreshed) {
          setSelectedPost(refreshed);
        }
      }
    });
    return () => unsubscribe();
  }, [labType]);

  // Marcar como visto al abrir una publicación
  useEffect(() => {
    if (selectedPost && userUid) {
      labInstructionService.markAsSeen(userUid, selectedPost.id);
    }
  }, [selectedPost, userUid]);

  const openNewComposer = () => {
    setEditingPostId(null);
    setFormLabType(labType);
    setFormTitle('');
    setFormSubtitle('');
    setFormSummary('');
    setFormContent('');
    setFormPinned(false);
    setFormImages([]);
    setFormImageUrlInput('');
    setFormScripts([]);
    setFormLinks([]);
    setIsPreviewTab(false);
    setIsComposerOpen(true);
  };

  const openEditComposer = (post: LabInstructionPost) => {
    setEditingPostId(post.id);
    setFormLabType(post.labType);
    setFormTitle(post.title);
    setFormSubtitle(post.subtitle || '');
    setFormSummary(post.summary);
    setFormContent(post.content);
    setFormPinned(Boolean(post.pinned));
    setFormImages(post.images || []);
    setFormImageUrlInput('');
    setFormScripts(post.scripts || []);
    setFormLinks(post.links || []);
    setIsPreviewTab(false);
    setIsComposerOpen(true);
  };

  // Insertar formato rico en el textarea del profesor
  const applyFormatToContent = (prefix: string, suffix: string = '', placeholder: string = 'texto') => {
    const textarea = contentTextareaRef.current;
    if (!textarea) {
      setFormContent(prev => `${prev}${prefix}${placeholder}${suffix}`);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = formContent.slice(start, end) || placeholder;
    const before = formContent.slice(0, start);
    const after = formContent.slice(end);

    const updated = `${before}${prefix}${selected}${suffix}${after}`;
    setFormContent(updated);

    requestAnimationFrame(() => {
      textarea.focus();
      const newCursorPos = start + prefix.length + selected.length + suffix.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    });
  };

  // Soportar pegar imagen directamente desde el portapapeles (Ctrl+V desde WhatsApp / Capturas)
  const handlePasteImage = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.startsWith('image/')) {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) {
          try {
            const compressed = await labInstructionService.compressImageFile(file);
            setFormImages(prev => [...prev, compressed]);
          } catch (err) {
            console.warn('Error comprimiendo imagen pegada:', err);
          }
        }
      }
    }
  };

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      try {
        const compressed = await labInstructionService.compressImageFile(files[i]);
        setFormImages(prev => [...prev, compressed]);
      } catch (err) {
        console.warn('Error subiendo imagen:', err);
      }
    }
    e.target.value = '';
  };

  const handleAddImageUrl = () => {
    const clean = formImageUrlInput.trim();
    if (!clean) return;
    setFormImages(prev => [...prev, clean]);
    setFormImageUrlInput('');
  };

  const handleAddScript = () => {
    const newScript: LabInstructionScript = {
      id: `scr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      title:
        labType === 'sql'
          ? `Script SQL #${formScripts.length + 1}`
          : `Código Kotlin #${formScripts.length + 1}`,
      language: labType,
      code:
        labType === 'sql'
          ? '-- Pega aquí el script SQL (CREATE TABLE, INSERT, etc.)\n'
          : '// Pega aquí el código Kotlin para los estudiantes\nfun main() {\n    \n}'
    };
    setFormScripts(prev => [...prev, newScript]);
  };

  const handleAddLink = () => {
    const newLink: LabInstructionLink = {
      id: `lnk_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      label: 'Material de apoyo / Documento',
      url: 'https://'
    };
    setFormLinks(prev => [...prev, newLink]);
  };

  const handleSavePost = async () => {
    if (!formTitle.trim()) return;
    setIsSaving(true);
    try {
      const existing = editingPostId ? posts.find(p => p.id === editingPostId) : undefined;
      const summaryText =
        formSummary.trim() ||
        formContent
          .replace(/[#*_>`]/g, '')
          .trim()
          .slice(0, 150);

      const saved = await labInstructionService.saveInstruction({
        id: editingPostId || undefined,
        createdAt: existing?.createdAt,
        labType: formLabType,
        title: formTitle.trim(),
        subtitle: formSubtitle.trim(),
        summary: summaryText,
        content: formContent,
        images: formImages,
        scripts: formScripts.filter(s => s.code.trim().length > 0),
        links: formLinks.filter(l => l.url.trim().length > 0 && l.url.trim() !== 'https://'),
        authorName: userName || 'Profesor',
        pinned: formPinned
      });

      soundService.playCorrect();
      setIsComposerOpen(false);
      setSelectedPost(saved);
    } catch (err) {
      console.error('Error guardando instrucción:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      await labInstructionService.deleteInstruction(id);
      if (selectedPost?.id === id) {
        setSelectedPost(null);
      }
      setDeleteConfirmId(null);
    } catch (err) {
      console.error('Error eliminando instrucción:', err);
    }
  };

  const handleCopyScript = async (script: LabInstructionScript) => {
    try {
      await navigator.clipboard.writeText(script.code);
      setCopiedScriptId(script.id);
      soundService.playToken();
      setTimeout(() => setCopiedScriptId(null), 2000);
    } catch {}
  };

  const handleLoadScript = (script: LabInstructionScript) => {
    if (!onLoadScriptToEditor) return;
    onLoadScriptToEditor(script.code, script.title, script.language);
    setLoadedScriptId(script.id);
    soundService.playCorrect();
    setTimeout(() => setLoadedScriptId(null), 2200);
  };

  const filteredPosts = posts.filter(p => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      (p.subtitle && p.subtitle.toLowerCase().includes(q)) ||
      p.summary.toLowerCase().includes(q) ||
      p.content.toLowerCase().includes(q)
    );
  });

  const accentBg = labType === 'sql' ? '#0284C7' : '#7C3AED';
  const accentLightBg = labType === 'sql' ? '#E0F2FE' : '#F3E8FF';
  const accentText = labType === 'sql' ? '#0369A1' : '#6D28D9';

  if (!isOpen && !isFloatingMode) return null;

  // ═══ MODO VENTANA FLOTANTE / ACOPLADA A UN LADO PARA LEER MIENTRAS PROGRAMAS ═══
  if (isFloatingMode && selectedPost) {
    return createPortal(
      <div
        className="lab-instr-root"
        style={{
          position: 'fixed',
          right: 16,
          bottom: 16,
          width: isFloatingCollapsed ? 320 : 'min(440px, calc(100vw - 32px))',
          maxHeight: isFloatingCollapsed ? 'auto' : 'min(78vh, 680px)',
          zIndex: 99990,
          backgroundColor: '#FFFFFF',
          border: '3px solid #000000',
          borderRadius: 16,
          boxShadow: '6px 6px 0px #000000',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          fontFamily: 'inherit'
        }}
      >
        {/* Barra superior de la ventana acoplada */}
        <div
          style={{
            backgroundColor: accentBg,
            color: '#FFFFFF',
            padding: '10px 14px',
            borderBottom: '2.5px solid #000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
            cursor: 'pointer'
          }}
          onClick={() => setIsFloatingCollapsed(prev => !prev)}
        >
          <div className="flex items-center gap-2 min-w-0">
            <ClipboardList size={16} className="flex-shrink-0" />
            <div className="min-w-0">
              <div className="text-[10px] font-black uppercase tracking-wider opacity-90">
                Instrucción en Vivo • {labType === 'sql' ? 'SQL Lab' : 'Kotlin Lab'}
              </div>
              <div className="text-xs font-black truncate">{selectedPost.title}</div>
            </div>
          </div>

          <div className="flex items-center gap-1 flex-shrink-0" onClick={e => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setIsFloatingCollapsed(prev => !prev)}
              className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors"
              title={isFloatingCollapsed ? 'Desplegar enunciado' : 'Minimizar barra'}
            >
              {isFloatingCollapsed ? <Maximize2 size={13} /> : <Minimize2 size={13} />}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsFloatingMode(false);
              }}
              className="px-2 py-1 rounded-lg bg-amber-300 hover:bg-amber-200 text-black font-black text-[11px] border border-black"
              title="Ver en pantalla completa"
            >
              Ampliar
            </button>
            <button
              type="button"
              onClick={() => {
                setIsFloatingMode(false);
                onClose();
              }}
              className="p-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white border border-black"
              title="Cerrar instrucciones"
            >
              <X size={13} />
            </button>
          </div>
        </div>

        {/* Contenido desplazable de la publicación mientras el alumno programa */}
        {!isFloatingCollapsed && (
          <div className="p-4 overflow-y-auto space-y-4 bg-slate-50" style={{ maxHeight: 'calc(78vh - 58px)' }}>
            <div className="bg-white p-3.5 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000]">
              {selectedPost.subtitle && (
                <div className="text-xs font-extrabold text-sky-700 mb-1">{selectedPost.subtitle}</div>
              )}
              <RichPostContent content={selectedPost.content} />
            </div>

            {/* Imágenes adjuntas */}
            {selectedPost.images && selectedPost.images.length > 0 && (
              <div className="space-y-2">
                <div className="text-[11px] font-black uppercase text-slate-600 flex items-center gap-1.5">
                  <ImageIcon size={13} /> Imágenes del Ejercicio ({selectedPost.images.length})
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {selectedPost.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`Adjunto ${i + 1}`}
                      onClick={() => setZoomImageUrl(img)}
                      className="w-full rounded-xl border-2 border-black cursor-zoom-in hover:opacity-95 transition-opacity bg-white"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Scripts adjuntos */}
            {selectedPost.scripts && selectedPost.scripts.length > 0 && (
              <div className="space-y-2.5">
                <div className="text-[11px] font-black uppercase text-slate-600 flex items-center gap-1.5">
                  <Code2 size={13} /> Scripts del Ejercicio ({selectedPost.scripts.length})
                </div>
                {selectedPost.scripts.map(scr => (
                  <div
                    key={scr.id}
                    className="rounded-xl border-2 border-black overflow-hidden bg-slate-900 text-slate-100 shadow-[3px_3px_0px_#000]"
                  >
                    <div className="px-3 py-2 bg-slate-800 border-b border-slate-700 flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-xs font-bold text-amber-300 truncate">{scr.title}</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleCopyScript(scr)}
                          className="px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-[11px] font-bold text-white flex items-center gap-1"
                        >
                          {copiedScriptId === scr.id ? <Check size={11} /> : <Copy size={11} />}
                          {copiedScriptId === scr.id ? 'Copiado' : 'Copiar'}
                        </button>
                        {onLoadScriptToEditor && (
                          <button
                            type="button"
                            onClick={() => handleLoadScript(scr)}
                            className="px-2 py-1 rounded bg-emerald-400 hover:bg-emerald-300 text-black text-[11px] font-black border border-black flex items-center gap-1"
                          >
                            {loadedScriptId === scr.id ? <Check size={11} /> : <Play size={11} />}
                            {loadedScriptId === scr.id ? '¡Cargado!' : 'Cargar al Editor'}
                          </button>
                        )}
                      </div>
                    </div>
                    <pre className="p-3 text-xs font-mono overflow-x-auto max-h-48 leading-relaxed">
                      <code>{scr.code}</code>
                    </pre>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Lightbox de imagen si hace zoom desde modo acoplado */}
        {zoomImageUrl && (
          <div
            className="fixed inset-0 z-[100000] bg-black/85 flex items-center justify-center p-4"
            onClick={() => setZoomImageUrl(null)}
          >
            <img
              src={zoomImageUrl}
              alt="Vista ampliada"
              className="max-w-full max-h-[90vh] rounded-xl border-2 border-white shadow-2xl"
            />
          </div>
        )}
      </div>,
      document.body
    );
  }

  // ═══ MODAL PRINCIPAL (MURO DE TARGETS + PUBLICACIÓN ESTILO FACEBOOK + COMPOSER DEL PROFESOR) ═══
  return createPortal(
    <div
      className="lab-instr-root fixed inset-0 z-[99980] bg-black/65 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-[#F8FAFC] border-3 border-black rounded-2xl shadow-[8px_8px_0px_#000000] flex flex-col overflow-hidden"
        style={{ maxHeight: 'min(92vh, 860px)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* ═══ CABECERA DEL MURO DE INSTRUCCIONES ═══ */}
        <div
          style={{ backgroundColor: accentBg }}
          className="px-4 sm:px-6 py-3.5 text-white border-b-3 border-black flex items-center justify-between gap-3 flex-wrap"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-white text-black border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center flex-shrink-0">
              <ClipboardList size={21} strokeWidth={2.5} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-black tracking-tight uppercase">
                  Instrucciones de Ejercicios • {labType === 'sql' ? 'SQLite Lab' : 'Kotlin Lab'}
                </h2>
                <span className="px-2 py-0.5 text-[11px] font-black bg-amber-300 text-black border border-black rounded-full">
                  {posts.length} {posts.length === 1 ? 'publicación' : 'publicaciones'}
                </span>
              </div>
              {/* Fecha de hoy siempre visible */}
              <div className="text-xs font-bold text-white/95 flex items-center gap-1.5 mt-0.5">
                <Calendar size={13} className="flex-shrink-0" />
                <span>Hoy: {getTodayHeaderString()}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && !isComposerOpen && (
              <button
                type="button"
                onClick={openNewComposer}
                className="px-3.5 py-2 rounded-xl bg-amber-300 hover:bg-amber-200 text-black font-black text-xs sm:text-sm border-2 border-black shadow-[3px_3px_0px_#000] active:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus size={16} strokeWidth={3} />
                <span>Nueva Instrucción</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white hover:bg-red-100 text-black border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center cursor-pointer"
              title="Cerrar"
            >
              <X size={18} strokeWidth={2.8} />
            </button>
          </div>
        </div>

        {/* ═══ CUERPO PRINCIPAL ═══ */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* ─── VISTA 1: FORMULARIO DEL PROFESOR (CREAR / EDITAR INSTRUCCIÓN) ─── */}
          {isComposerOpen ? (
            <div className="bg-white border-3 border-black rounded-2xl shadow-[5px_5px_0px_#000] overflow-hidden">
              <div className="px-5 py-3.5 bg-amber-100 border-b-2 border-black flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-slate-900 text-sm sm:text-base uppercase">
                    {editingPostId ? 'Editar Publicación de Ejercicio' : 'Nueva Publicación de Ejercicio'}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPreviewTab(prev => !prev)}
                    className={`px-3 py-1.5 rounded-lg border-2 border-black font-black text-xs flex items-center gap-1.5 cursor-pointer ${
                      isPreviewTab ? 'bg-sky-500 text-white' : 'bg-white text-slate-900'
                    }`}
                  >
                    <Eye size={14} />
                    <span>{isPreviewTab ? 'Volver a Editar' : 'Vista Previa Facebook'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsComposerOpen(false)}
                    className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-800 border-2 border-black font-bold text-xs cursor-pointer"
                  >
                    Cancelar
                  </button>
                </div>
              </div>

              {isPreviewTab ? (
                <div className="p-5 space-y-4 bg-slate-100">
                  <div className="text-xs font-black uppercase text-slate-500">
                    Vista previa de la Publicación Completa (Estilo Facebook):
                  </div>
                  <div className="bg-white border-3 border-black rounded-2xl shadow-[5px_5px_0px_#000] p-5 space-y-4">
                    <div className="flex items-center gap-3 border-b-2 border-slate-100 pb-3">
                      <div
                        style={{ backgroundColor: accentBg }}
                        className="w-11 h-11 rounded-full border-2 border-black flex items-center justify-center text-white font-black text-lg"
                      >
                        👨‍🏫
                      </div>
                      <div>
                        <div className="font-black text-slate-900 text-base">
                          {userName || 'Profesor'}
                        </div>
                        <div className="text-xs font-bold text-slate-500">
                          Publicado hoy • {getTodayHeaderString()}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                        {formTitle || 'Título del ejercicio'}
                      </h1>
                      {formSubtitle && (
                        <div className="text-sm font-bold text-sky-700 mt-0.5">{formSubtitle}</div>
                      )}
                    </div>
                    <RichPostContent content={formContent || 'Escribe el enunciado del ejercicio...'} />
                  </div>
                </div>
              ) : (
                <div className="p-5 space-y-4" onPaste={handlePasteImage}>
                  {/* Laboratorio destino y Fijar */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                        Laboratorio Destino
                      </label>
                      <select
                        value={formLabType}
                        onChange={e => setFormLabType(e.target.value as LabInstructionTarget)}
                        className="w-full px-3 py-2 rounded-xl border-2 border-black font-bold text-sm bg-white"
                      >
                        <option value="sql">Laboratorio SQL (SQLite)</option>
                        <option value="kotlin">Laboratorio Kotlin</option>
                        <option value="both">Ambos Laboratorios (SQL y Kotlin)</option>
                      </select>
                    </div>

                    <div className="flex items-end">
                      <label className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl border-2 border-black bg-amber-50 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={formPinned}
                          onChange={e => setFormPinned(e.target.checked)}
                          className="w-4 h-4 accent-amber-600"
                        />
                        <Pin size={15} className="text-amber-700" />
                        <span className="text-xs font-black text-slate-900">
                          Fijar arriba como ejercicio destacado de hoy
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Título y Subtítulo */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                        Título del Ejercicio *
                      </label>
                      <input
                        type="text"
                        value={formTitle}
                        onChange={e => setFormTitle(e.target.value)}
                        placeholder="Ej: Práctica #4 - Consultas con INNER JOIN y GROUP BY"
                        className="w-full px-3.5 py-2 rounded-xl border-2 border-black font-bold text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                        Subtítulo / Unidad (Opcional)
                      </label>
                      <input
                        type="text"
                        value={formSubtitle}
                        onChange={e => setFormSubtitle(e.target.value)}
                        placeholder="Ej: Unidad 3 • Tiempo estimado: 40 min"
                        className="w-full px-3.5 py-2 rounded-xl border-2 border-black font-semibold text-sm"
                      />
                    </div>
                  </div>

                  {/* Descripción corta para la tarjeta (target) */}
                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                      Descripción Corta (Sale en la tarjeta / target antes de abrir)
                    </label>
                    <input
                      type="text"
                      value={formSummary}
                      onChange={e => setFormSummary(e.target.value)}
                      placeholder="Ej: Crea la base de datos de Clínica, ejecuta el script adjunto y resuelve las 5 consultas solicitadas."
                      className="w-full px-3.5 py-2 rounded-xl border-2 border-black font-medium text-sm"
                    />
                  </div>

                  {/* Barra de herramientas de formato rico + Enunciado completo */}
                  <div>
                    <div className="flex items-center justify-between flex-wrap gap-1 mb-1.5">
                      <label className="text-xs font-black uppercase text-slate-700">
                        Enunciado Completo e Instrucciones (Soporta formato rico)
                      </label>
                      <span className="text-[11px] font-bold text-sky-700">
                        💡 Puedes pegar imágenes directo con Ctrl+V
                      </span>
                    </div>

                    {/* Toolbar de Formato */}
                    <div className="flex items-center gap-1 flex-wrap p-1.5 bg-slate-100 border-2 border-black rounded-t-xl border-b-0">
                      <button
                        type="button"
                        onClick={() => applyFormatToContent('\n# ', '\n', 'Título de Sección')}
                        className="px-2 py-1 rounded bg-white hover:bg-amber-100 border border-black text-xs font-black flex items-center gap-1"
                        title="Título Grande"
                      >
                        <Heading1 size={13} /> Título
                      </button>
                      <button
                        type="button"
                        onClick={() => applyFormatToContent('\n## ', '\n', 'Subtítulo')}
                        className="px-2 py-1 rounded bg-white hover:bg-amber-100 border border-black text-xs font-black flex items-center gap-1"
                        title="Subtítulo"
                      >
                        <Heading2 size={13} /> Subtítulo
                      </button>
                      <button
                        type="button"
                        onClick={() => applyFormatToContent('**', '**', 'texto en negrita')}
                        className="px-2 py-1 rounded bg-white hover:bg-amber-100 border border-black text-xs font-black flex items-center gap-1"
                        title="Negrita"
                      >
                        <Bold size={13} /> Negrita
                      </button>
                      <button
                        type="button"
                        onClick={() => applyFormatToContent('*', '*', 'texto en cursiva')}
                        className="px-2 py-1 rounded bg-white hover:bg-amber-100 border border-black text-xs font-bold italic flex items-center gap-1"
                        title="Cursiva"
                      >
                        <Italic size={13} /> Cursiva
                      </button>
                      <button
                        type="button"
                        onClick={() => applyFormatToContent('__', '__', 'texto subrayado')}
                        className="px-2 py-1 rounded bg-white hover:bg-amber-100 border border-black text-xs font-bold underline flex items-center gap-1"
                        title="Subrayado"
                      >
                        <Underline size={13} /> Subrayado
                      </button>
                      <button
                        type="button"
                        onClick={() => applyFormatToContent('`', '`', 'código')}
                        className="px-2 py-1 rounded bg-white hover:bg-amber-100 border border-black text-xs font-mono font-bold flex items-center gap-1"
                        title="Código en línea"
                      >
                        <Code2 size={13} /> Código
                      </button>
                      <button
                        type="button"
                        onClick={() => applyFormatToContent('\n- ', '', 'Elemento de lista')}
                        className="px-2 py-1 rounded bg-white hover:bg-amber-100 border border-black text-xs font-bold flex items-center gap-1"
                        title="Lista de viñetas"
                      >
                        <List size={13} /> Lista
                      </button>
                      <button
                        type="button"
                        onClick={() => applyFormatToContent('\n1. ', '', 'Paso número 1')}
                        className="px-2 py-1 rounded bg-white hover:bg-amber-100 border border-black text-xs font-bold flex items-center gap-1"
                        title="Lista numerada"
                      >
                        <ListOrdered size={13} /> Numerada
                      </button>
                      <button
                        type="button"
                        onClick={() => applyFormatToContent('\n> ', '', 'Nota importante para el estudiante')}
                        className="px-2 py-1 rounded bg-white hover:bg-amber-100 border border-black text-xs font-bold flex items-center gap-1"
                        title="Nota destacada"
                      >
                        <Quote size={13} /> Nota
                      </button>
                      <button
                        type="button"
                        onClick={() => applyFormatToContent('[', '](https://)', 'Texto del enlace')}
                        className="px-2 py-1 rounded bg-white hover:bg-amber-100 border border-black text-xs font-bold flex items-center gap-1"
                        title="Insertar enlace en el texto"
                      >
                        <LinkIcon size={13} /> Link
                      </button>
                    </div>

                    <textarea
                      ref={contentTextareaRef}
                      rows={8}
                      value={formContent}
                      onChange={e => setFormContent(e.target.value)}
                      placeholder={`Escribe aquí todo el enunciado del ejercicio...\n\nEjemplo:\n# Objetivo de la Práctica\nDesarrollar las consultas **SELECT** sobre la tabla \`Pacientes\`.\n\n## Instrucciones paso a paso\n1. Carga el script SQL adjunto abajo haciendo clic en **Cargar al Editor**.\n2. Resuelve las consultas indicadas.`}
                      className="w-full p-3.5 rounded-b-xl border-2 border-black font-medium text-sm focus:outline-none focus:bg-amber-50/20"
                    />
                  </div>

                  {/* SECCIÓN DE SCRIPTS ADJUNTOS */}
                  <div className="p-4 rounded-xl bg-slate-50 border-2 border-black space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <FileCode2 size={17} className="text-sky-700" />
                        <span className="text-xs font-black uppercase text-slate-900">
                          Scripts / Código Adjunto ({formScripts.length})
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddScript}
                        className="px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1 cursor-pointer"
                      >
                        <Plus size={14} /> Añadir Script (SQL / Kotlin)
                      </button>
                    </div>

                    {formScripts.length === 0 ? (
                      <p className="text-xs text-slate-500 font-medium">
                        Puedes adjuntar scripts de creación de tablas, inserts o código base para que el estudiante los copie o los cargue en su editor con 1 clic.
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {formScripts.map((scr, idx) => (
                          <div
                            key={scr.id}
                            className="p-3 rounded-xl bg-white border-2 border-black space-y-2"
                          >
                            <div className="flex items-center gap-2 flex-wrap">
                              <input
                                type="text"
                                value={scr.title}
                                onChange={e => {
                                  const val = e.target.value;
                                  setFormScripts(prev =>
                                    prev.map((item, i) => (i === idx ? { ...item, title: val } : item))
                                  );
                                }}
                                placeholder="Nombre del Script (ej: Script Tablas y Datos)"
                                className="flex-1 px-2.5 py-1.5 rounded-lg border-2 border-black font-bold text-xs"
                              />
                              <select
                                value={scr.language}
                                onChange={e => {
                                  const lang = e.target.value as 'sql' | 'kotlin';
                                  setFormScripts(prev =>
                                    prev.map((item, i) => (i === idx ? { ...item, language: lang } : item))
                                  );
                                }}
                                className="px-2.5 py-1.5 rounded-lg border-2 border-black font-bold text-xs bg-slate-100"
                              >
                                <option value="sql">SQL</option>
                                <option value="kotlin">Kotlin</option>
                              </select>
                              <button
                                type="button"
                                onClick={() =>
                                  setFormScripts(prev => prev.filter((_, i) => i !== idx))
                                }
                                className="p-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 border border-black"
                                title="Quitar script"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                            <textarea
                              rows={5}
                              value={scr.code}
                              onChange={e => {
                                const codeVal = e.target.value;
                                setFormScripts(prev =>
                                  prev.map((item, i) => (i === idx ? { ...item, code: codeVal } : item))
                                );
                              }}
                              className="w-full p-2.5 rounded-lg bg-slate-900 text-emerald-300 font-mono text-xs border border-black"
                              placeholder="Pega aquí el código del script..."
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* SECCIÓN DE IMÁGENES ADJUNTAS */}
                  <div className="p-4 rounded-xl bg-slate-50 border-2 border-black space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <ImageIcon size={17} className="text-purple-700" />
                        <span className="text-xs font-black uppercase text-slate-900">
                          Imágenes / Diagramas Adjuntos ({formImages.length})
                        </span>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <input
                          ref={imageFileInputRef}
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={handleImageFileUpload}
                        />
                        <button
                          type="button"
                          onClick={() => imageFileInputRef.current?.click()}
                          className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1 cursor-pointer"
                        >
                          <Upload size={13} /> Subir Imagen
                        </button>
                      </div>
                    </div>

                    {/* Añadir por URL */}
                    <div className="flex items-center gap-2">
                      <input
                        type="url"
                        value={formImageUrlInput}
                        onChange={e => setFormImageUrlInput(e.target.value)}
                        placeholder="O pega la URL de una imagen (https://...) o presiona Ctrl+V con una captura copiada"
                        className="flex-1 px-3 py-1.5 rounded-lg border-2 border-black text-xs font-medium bg-white"
                      />
                      <button
                        type="button"
                        onClick={handleAddImageUrl}
                        className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-black font-bold text-xs border-2 border-black"
                      >
                        Añadir URL
                      </button>
                    </div>

                    {formImages.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                        {formImages.map((img, i) => (
                          <div
                            key={i}
                            className="relative group rounded-xl border-2 border-black overflow-hidden bg-white h-28"
                          >
                            <img src={img} alt={`Preview ${i}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => setFormImages(prev => prev.filter((_, idx) => idx !== i))}
                              className="absolute top-1.5 right-1.5 p-1 rounded-lg bg-red-600 text-white border border-black shadow"
                              title="Eliminar imagen"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* SECCIÓN DE LINKS / ENLACES ADJUNTOS */}
                  <div className="p-4 rounded-xl bg-slate-50 border-2 border-black space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <Globe size={17} className="text-emerald-700" />
                        <span className="text-xs font-black uppercase text-slate-900">
                          Enlaces y Recursos Externos ({formLinks.length})
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddLink}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black font-black text-xs border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1 cursor-pointer"
                      >
                        <Plus size={14} /> Añadir Link
                      </button>
                    </div>

                    {formLinks.map((lnk, idx) => (
                      <div key={lnk.id} className="flex items-center gap-2 flex-wrap">
                        <input
                          type="text"
                          value={lnk.label}
                          onChange={e => {
                            const val = e.target.value;
                            setFormLinks(prev =>
                              prev.map((item, i) => (i === idx ? { ...item, label: val } : item))
                            );
                          }}
                          placeholder="Título del enlace (ej: Presentación PDF)"
                          className="sm:w-56 px-2.5 py-1.5 rounded-lg border-2 border-black font-bold text-xs bg-white"
                        />
                        <input
                          type="url"
                          value={lnk.url}
                          onChange={e => {
                            const val = e.target.value;
                            setFormLinks(prev =>
                              prev.map((item, i) => (i === idx ? { ...item, url: val } : item))
                            );
                          }}
                          placeholder="https://..."
                          className="flex-1 px-2.5 py-1.5 rounded-lg border-2 border-black font-medium text-xs bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => setFormLinks(prev => prev.filter((_, i) => i !== idx))}
                          className="p-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 border border-black"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Botón Guardar Publicación */}
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsComposerOpen(false)}
                      className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border-2 border-black font-bold text-sm cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      disabled={isSaving || !formTitle.trim()}
                      onClick={handleSavePost}
                      className="px-6 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 text-black font-black text-sm border-2 border-black shadow-[4px_4px_0px_#000] active:translate-y-0.5 transition-all cursor-pointer"
                    >
                      {isSaving
                        ? 'Publicando...'
                        : editingPostId
                        ? 'Guardar Cambios en la Publicación'
                        : 'Publicar Instrucción ahora'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : selectedPost ? (
            /* ─── VISTA 2: PUBLICACIÓN COMPLETA ESTILO FACEBOOK AL HACER CLIC EN UN TARGET ─── */
            <div className="space-y-4">
              {/* Barra de navegación superior de la publicación */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedPost(null)}
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-black text-xs sm:text-sm border-2 border-black shadow-[3px_3px_0px_#000] flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft size={16} strokeWidth={2.8} />
                  <span>Volver a todas las instrucciones</span>
                </button>

                <div className="flex items-center gap-2 flex-wrap">
                  {/* Botón para mantener abierto a un lado mientras el estudiante programa */}
                  <button
                    type="button"
                    onClick={() => setIsFloatingMode(true)}
                    className="px-3.5 py-2 rounded-xl bg-amber-300 hover:bg-amber-200 text-black font-black text-xs sm:text-sm border-2 border-black shadow-[3px_3px_0px_#000] flex items-center gap-1.5 cursor-pointer"
                    title="Minimiza esta publicación a una ventana flotante para que puedas leerla mientras escribes tu código"
                  >
                    <PanelRightOpen size={16} />
                    <span>Mantener abierto mientras programo</span>
                  </button>

                  {isAdmin && (
                    <>
                      <button
                        type="button"
                        onClick={() => openEditComposer(selectedPost)}
                        className="px-3 py-2 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-900 font-black text-xs border-2 border-black flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 size={14} /> Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(selectedPost.id)}
                        className="px-3 py-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-800 font-black text-xs border-2 border-black flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 size={14} /> Eliminar
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* TARJETA ESTILO PUBLICACIÓN DE FACEBOOK */}
              <article className="bg-white border-3 border-black rounded-2xl shadow-[6px_6px_0px_#000000] overflow-hidden">
                {/* Header estilo Facebook Post */}
                <div className="p-4 sm:p-5 border-b-2 border-slate-100 flex items-start justify-between gap-3 bg-gradient-to-r from-slate-50 to-white">
                  <div className="flex items-center gap-3">
                    <div
                      style={{ backgroundColor: accentBg }}
                      className="w-12 h-12 rounded-full border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center text-white text-xl flex-shrink-0"
                    >
                      👨‍🏫
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-black text-slate-900 text-base">
                          {selectedPost.authorName || 'Profesor'}
                        </span>
                        <span
                          style={{ backgroundColor: accentLightBg, color: accentText }}
                          className="px-2 py-0.5 text-[11px] font-black rounded-full border border-black"
                        >
                          {selectedPost.labType === 'sql'
                            ? 'SQLite Lab'
                            : selectedPost.labType === 'kotlin'
                            ? 'Kotlin Lab'
                            : 'SQL & Kotlin'}
                        </span>
                        {selectedPost.pinned && (
                          <span className="px-2 py-0.5 text-[11px] font-black bg-amber-200 text-amber-950 rounded-full border border-black flex items-center gap-1">
                            <Pin size={11} /> Destacado
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <Clock size={12} />
                        <span>{formatInstructionDate(selectedPost.createdAt).fullLabel}</span>
                      </div>
                    </div>
                  </div>

                  {formatInstructionDate(selectedPost.createdAt).isToday && (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-300 text-black font-black text-xs border-2 border-black shadow-[2px_2px_0px_#000] flex-shrink-0">
                      🔥 DE HOY
                    </span>
                  )}
                </div>

                {/* Cuerpo de la Publicación */}
                <div className="p-5 sm:p-6 space-y-5">
                  {/* Título y subtítulo del ejercicio */}
                  <div>
                    <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                      {selectedPost.title}
                    </h1>
                    {selectedPost.subtitle && (
                      <div
                        style={{ color: accentText }}
                        className="text-sm font-extrabold mt-1"
                      >
                        {selectedPost.subtitle}
                      </div>
                    )}
                  </div>

                  {/* Contenido enriquecido del enunciado */}
                  <div className="pt-1">
                    <RichPostContent content={selectedPost.content} />
                  </div>

                  {/* Galería de Imágenes estilo Facebook */}
                  {selectedPost.images && selectedPost.images.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <div className="text-xs font-black uppercase text-slate-500 flex items-center gap-1.5">
                        <ImageIcon size={14} /> Imágenes Adjuntas (Haz clic para ampliar)
                      </div>
                      <div
                        className={`grid gap-3 ${
                          selectedPost.images.length === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'
                        }`}
                      >
                        {selectedPost.images.map((img, idx) => (
                          <div
                            key={idx}
                            onClick={() => setZoomImageUrl(img)}
                            className="rounded-xl border-2 border-black overflow-hidden bg-slate-100 shadow-[3px_3px_0px_#000] cursor-zoom-in group relative"
                          >
                            <img
                              src={img}
                              alt={`${selectedPost.title} - imagen ${idx + 1}`}
                              className="w-full max-h-[460px] object-contain bg-slate-900/5 group-hover:scale-[1.01] transition-transform"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Scripts Adjuntos listos para copiar o cargar al editor */}
                  {selectedPost.scripts && selectedPost.scripts.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <div className="text-xs font-black uppercase text-slate-700 flex items-center gap-1.5">
                        <Code2 size={15} className="text-sky-600" />
                        <span>
                          Scripts del Ejercicio ({selectedPost.scripts.length}) — Cópialos o cárgalos directo a tu editor
                        </span>
                      </div>

                      {selectedPost.scripts.map(scr => (
                        <div
                          key={scr.id}
                          className="rounded-xl border-2 border-black overflow-hidden bg-slate-900 text-slate-100 shadow-[4px_4px_0px_#000]"
                        >
                          <div className="px-4 py-2.5 bg-slate-800 border-b border-slate-700 flex items-center justify-between gap-2 flex-wrap">
                            <div className="flex items-center gap-2">
                              <FileCode2 size={15} className="text-amber-300" />
                              <span className="font-black text-xs sm:text-sm text-white">
                                {scr.title}
                              </span>
                              <span className="px-2 py-0.5 text-[10px] font-black uppercase bg-slate-700 text-sky-300 rounded border border-slate-600">
                                {scr.language}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleCopyScript(scr)}
                                className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                              >
                                {copiedScriptId === scr.id ? (
                                  <>
                                    <Check size={13} className="text-emerald-400" />
                                    <span>¡Copiado!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy size={13} />
                                    <span>Copiar Script</span>
                                  </>
                                )}
                              </button>

                              {onLoadScriptToEditor && (
                                <button
                                  type="button"
                                  onClick={() => handleLoadScript(scr)}
                                  className="px-3 py-1.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-black font-black text-xs border border-black shadow-[2px_2px_0px_#000] flex items-center gap-1.5 cursor-pointer transition-all"
                                >
                                  {loadedScriptId === scr.id ? (
                                    <>
                                      <Check size={13} strokeWidth={3} />
                                      <span>¡Cargado en tu Editor!</span>
                                    </>
                                  ) : (
                                    <>
                                      <Play size={13} fill="currentColor" />
                                      <span>Cargar en mi Editor</span>
                                    </>
                                  )}
                                </button>
                              )}
                            </div>
                          </div>

                          <pre className="p-4 text-xs sm:text-sm font-mono overflow-x-auto max-h-80 leading-relaxed text-emerald-300">
                            <code>{scr.code}</code>
                          </pre>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Enlaces / Links Adjuntos */}
                  {selectedPost.links && selectedPost.links.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <div className="text-xs font-black uppercase text-slate-600 flex items-center gap-1.5">
                        <LinkIcon size={14} /> Enlaces y Material de Referencia
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {selectedPost.links.map(lnk => (
                          <a
                            key={lnk.id}
                            href={lnk.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-xl bg-sky-50 hover:bg-sky-100 border-2 border-black shadow-[3px_3px_0px_#000] flex items-center justify-between gap-2 transition-colors"
                          >
                            <div className="min-w-0">
                              <div className="font-black text-xs sm:text-sm text-slate-900 truncate">
                                {lnk.label}
                              </div>
                              <div className="text-[11px] font-medium text-sky-700 truncate">
                                {lnk.url}
                              </div>
                            </div>
                            <ExternalLink size={16} className="text-sky-700 flex-shrink-0" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            </div>
          ) : (
            /* ─── VISTA 3: LISTA DE TARGETS (TARJETAS CON FECHA, TÍTULO Y DESCRIPCIÓN) ─── */
            <div className="space-y-4">
              {/* Buscador rápido */}
              {posts.length > 0 && (
                <div className="flex items-center gap-2 bg-white px-3.5 py-2.5 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000]">
                  <Search size={16} className="text-slate-400 flex-shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Buscar ejercicio por título, fecha o palabra clave..."
                    className="w-full text-sm font-semibold text-slate-800 focus:outline-none bg-transparent"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="text-xs font-bold text-slate-400 hover:text-slate-700"
                    >
                      Limpiar
                    </button>
                  )}
                </div>
              )}

              {filteredPosts.length === 0 ? (
                <div className="bg-white border-3 border-black rounded-2xl p-8 text-center shadow-[4px_4px_0px_#000] space-y-3">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-100 border-2 border-black flex items-center justify-center">
                    <ClipboardList size={28} className="text-amber-700" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900">
                    {searchQuery
                      ? 'No se encontraron instrucciones con esa búsqueda'
                      : 'Aún no hay instrucciones publicadas en este laboratorio'}
                  </h3>
                  <p className="text-sm font-medium text-slate-600 max-w-md mx-auto">
                    {isAdmin
                      ? 'Haz clic en el botón "+ Nueva Instrucción" arriba a la derecha para publicar el enunciado, scripts, imágenes o enlaces del ejercicio de hoy.'
                      : 'Cuando el profesor publique las instrucciones y scripts del ejercicio de hoy, aparecerán aquí mismo como tarjetas para que tengas todo a mano.'}
                  </p>
                  {isAdmin && !searchQuery && (
                    <button
                      type="button"
                      onClick={openNewComposer}
                      className="mt-2 px-5 py-2.5 rounded-xl bg-amber-300 hover:bg-amber-200 text-black font-black text-sm border-2 border-black shadow-[3px_3px_0px_#000] inline-flex items-center gap-2 cursor-pointer"
                    >
                      <Plus size={16} strokeWidth={3} />
                      <span>Crear Primera Instrucción</span>
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredPosts.map(post => {
                    const dateInfo = formatInstructionDate(post.createdAt);
                    const scriptCount = post.scripts?.length || 0;
                    const imageCount = post.images?.length || 0;
                    const linkCount = post.links?.length || 0;

                    return (
                      <div
                        key={post.id}
                        onClick={() => {
                          soundService.playToken();
                          setSelectedPost(post);
                        }}
                        className="group bg-white hover:bg-amber-50/40 border-3 border-black rounded-2xl p-4 sm:p-5 shadow-[5px_5px_0px_#000000] hover:translate-y-[-2px] transition-all cursor-pointer flex flex-col justify-between gap-3"
                      >
                        <div className="space-y-2.5">
                          {/* Fila superior del Target: Fecha + Badges */}
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-[11px] font-black border border-black flex items-center gap-1 ${
                                  dateInfo.isToday
                                    ? 'bg-emerald-300 text-black'
                                    : 'bg-slate-100 text-slate-800'
                                }`}
                              >
                                <Calendar size={11} />
                                {dateInfo.shortLabel} • {dateInfo.timeLabel}
                              </span>

                              {post.pinned && (
                                <span className="px-2 py-0.5 rounded-full text-[11px] font-black bg-amber-300 text-black border border-black flex items-center gap-1">
                                  <Pin size={10} /> Fijado
                                </span>
                              )}
                            </div>

                            {isAdmin && (
                              <div
                                className="flex items-center gap-1"
                                onClick={e => e.stopPropagation()}
                              >
                                <button
                                  type="button"
                                  onClick={() => labInstructionService.togglePin(post)}
                                  className={`p-1.5 rounded-lg border border-black ${
                                    post.pinned ? 'bg-amber-300 text-black' : 'bg-white text-slate-600'
                                  }`}
                                  title={post.pinned ? 'Desfijar' : 'Fijar arriba'}
                                >
                                  <Pin size={12} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => openEditComposer(post)}
                                  className="p-1.5 rounded-lg bg-sky-100 hover:bg-sky-200 text-sky-900 border border-black"
                                  title="Editar instrucción"
                                >
                                  <Edit3 size={12} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDeleteConfirmId(post.id)}
                                  className="p-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-800 border border-black"
                                  title="Eliminar instrucción"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Título y Subtítulo del Target */}
                          <div>
                            <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-sky-700 transition-colors leading-snug">
                              {post.title}
                            </h3>
                            {post.subtitle && (
                              <div className="text-xs font-extrabold text-sky-700 mt-0.5">
                                {post.subtitle}
                              </div>
                            )}
                          </div>

                          {/* Descripción corta en el Target */}
                          <p className="text-xs sm:text-sm font-medium text-slate-600 line-clamp-3 leading-relaxed">
                            {post.summary || post.content.replace(/[#*_>`]/g, '').slice(0, 140)}
                          </p>
                        </div>

                        {/* Pie del Target: Indicadores de contenido adjunto + Botón abrir */}
                        <div className="pt-3 border-t-2 border-slate-100 flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {scriptCount > 0 && (
                              <span className="px-2 py-0.5 rounded-md bg-slate-900 text-amber-300 text-[11px] font-black flex items-center gap-1">
                                <Code2 size={11} /> {scriptCount} {scriptCount === 1 ? 'Script' : 'Scripts'}
                              </span>
                            )}
                            {imageCount > 0 && (
                              <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-900 border border-purple-300 text-[11px] font-bold flex items-center gap-1">
                                <ImageIcon size={11} /> {imageCount} {imageCount === 1 ? 'Imagen' : 'Imágenes'}
                              </span>
                            )}
                            {linkCount > 0 && (
                              <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-300 text-[11px] font-bold flex items-center gap-1">
                                <LinkIcon size={11} /> {linkCount} {linkCount === 1 ? 'Link' : 'Links'}
                              </span>
                            )}
                          </div>

                          <span
                            style={{ color: accentText }}
                            className="text-xs font-black flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                          >
                            <span>Abrir publicación</span>
                            <ChevronRight size={15} strokeWidth={2.8} />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Confirmación de eliminación */}
        {deleteConfirmId && (
          <div className="p-4 bg-red-50 border-t-3 border-black flex items-center justify-between gap-3 flex-wrap">
            <span className="text-xs sm:text-sm font-black text-red-900">
              ¿Seguro que deseas eliminar esta publicación de instrucciones?
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-3 py-1.5 rounded-lg bg-white border-2 border-black font-bold text-xs"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => handleDeletePost(deleteConfirmId)}
                className="px-3 py-1.5 rounded-lg bg-red-600 text-white border-2 border-black font-black text-xs"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox de Imagen a pantalla completa */}
      {zoomImageUrl && (
        <div
          className="fixed inset-0 z-[100000] bg-black/85 flex items-center justify-center p-4"
          onClick={() => setZoomImageUrl(null)}
        >
          <img
            src={zoomImageUrl}
            alt="Imagen ampliada"
            className="max-w-full max-h-[90vh] rounded-xl border-2 border-white shadow-2xl"
          />
        </div>
      )}
    </div>,
    document.body
  );
};
