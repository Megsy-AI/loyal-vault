import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, X } from "lucide-react";

const SESSION_KEY = "nova-prize-popup-shown";

/** Congrats popup shown once per visit: tells the user they won $25,000 and links to the wallet. */
const PrizePopup = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    const timer = window.setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, "1");
      setOpen(true);
    }, 1200);
    return () => window.clearTimeout(timer);
  }, []);

  const goWithdraw = () => {
    setOpen(false);
    navigate({ to: "/wallet" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-sm border-primary/30 bg-gradient-to-b from-card to-background text-center [&>button]:hidden">
        <button
          onClick={() => setOpen(false)}
          className="absolute right-3 top-3 rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/15 shadow-[0_0_40px_hsl(var(--primary)/0.35)]">
          <Trophy className="h-10 w-10 text-primary" />
        </div>
        <h2 className="mt-4 text-2xl font-bold text-foreground">Congratulations!</h2>
        <p className="mt-1 text-sm text-muted-foreground">You've won a prize worth</p>
        <p className="mt-2 bg-gradient-to-r from-primary via-emerald-400 to-primary bg-clip-text text-4xl font-extrabold tracking-tight text-transparent">
          $25,000
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          Your prize is ready. Head to your wallet to withdraw it now.
        </p>
        <Button onClick={goWithdraw} className="mt-5 w-full text-base font-semibold" size="lg">
          Withdraw now
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PrizePopup;
