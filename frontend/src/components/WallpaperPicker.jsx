import { Button, Modal, useOverlayState } from "@heroui/react";
import { Check, ImageIcon } from "lucide-react";
import { useTransition } from "react";
import { useWallpaper } from "../context/wallpaper.js";
import { WALLPAPER_SECTIONS, WALLPAPERS } from "../data/wallpaper.js";

function WallpaperThumb({ wallpaper, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(wallpaper.id)}
      className={[
        "relative aspect-4/3 w-full overflow-hidden rounded-xl bg-slate-950 contain-[layout] transition-all duration-300 group/thumb",
        selected
          ? "outline-2 outline-offset-2 outline-blue-500 shadow-lg shadow-blue-500/20 scale-[0.98]"
          : "outline-1 outline-slate-800 hover:outline-slate-600 hover:scale-[1.02]",
        "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
      ].join(" ")}
      aria-pressed={selected}
    >
      <img
        src={wallpaper.url}
        alt=""
        width={320}
        height={240}
        className="pointer-events-none h-full w-full object-cover select-none transition-transform duration-500 group-hover/thumb:scale-110"
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 200px"
        referrerPolicy="no-referrer"
        draggable={false}
      />
      {/* Premium dark glass gradient text overlay */}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-slate-950/70 backdrop-blur-md border-t border-slate-800/40 px-2.5 py-2 text-left text-[11px] font-medium tracking-wide leading-tight text-slate-200 group-hover/thumb:text-white transition-colors duration-200">
        {wallpaper.label}
      </span>
      {selected ? (
        <span className="absolute right-2 top-2 z-10 flex size-5 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-md shadow-blue-500/30 animate-in zoom-in-75 duration-200">
          <Check className="size-3.5" strokeWidth={3} />
        </span>
      ) : null}
    </button>
  );
}

export function WallpaperPicker() {
  const modal = useOverlayState();
  const { wallpaperId, setWallpaperId } = useWallpaper();
  const [, startTransition] = useTransition();

  const handleSelect = (id) => {
    modal.close();
    startTransition(() => {
      setWallpaperId(id);
    });
  };

  return (
    <Modal.Root state={modal}>
      <Modal.Trigger>
        <Button 
          variant="ghost" 
          size="sm" 
          isIconOnly 
          className="text-slate-400 hover:text-white hover:bg-slate-900/60 rounded-xl transition-all duration-200 active:scale-95"
        >
          <ImageIcon className="size-5" />
        </Button>
      </Modal.Trigger>

      <Modal.Backdrop className="bg-slate-950/40 backdrop-blur-md transition-opacity duration-300">
        <Modal.Container size="lg" scroll="inside" placement="center">
          <Modal.Dialog className="max-h-[85dvh] border border-slate-800 bg-slate-900 text-white shadow-2xl rounded-2xl relative overflow-hidden">
            {/* Ambient branding background blur */}
            <div className="absolute top-[-20%] right-[-20%] h-[300px] w-[300px] rounded-full bg-blue-600/5 blur-[80px] pointer-events-none" />
            
            <Modal.Header className="flex flex-row items-center justify-between gap-3 border-b border-slate-800/60 pb-3.5 relative z-10">
              <Modal.Heading className="text-lg font-bold tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                System Wallpapers
              </Modal.Heading>
              <Modal.CloseTrigger className="text-slate-400 hover:text-white transition-colors" />
            </Modal.Header>

            <Modal.Body className="isolate space-y-8 pt-5 relative z-10 scrollbar-thin scrollbar-thumb-slate-800">
              {WALLPAPER_SECTIONS.map((section) => (
                <section key={section.id} className="space-y-3.5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">{section.title}</h3>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                    {WALLPAPERS.filter((w) => w.category === section.id).map((w) => (
                      <WallpaperThumb
                        key={w.id}
                        wallpaper={w}
                        selected={wallpaperId === w.id}
                        onSelect={handleSelect}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal.Root>
  );
}