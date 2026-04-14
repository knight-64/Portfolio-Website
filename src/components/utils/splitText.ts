import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type SplitTextOptions = {
  type?: string;
  linesClass?: string;
};

type SplitTarget = string | Element | Array<string | Element>;

export class SplitText {
  chars: HTMLElement[] = [];
  words: HTMLElement[] = [];

  private nodes: HTMLElement[] = [];
  private originalHTML = new Map<HTMLElement, string>();

  constructor(target: SplitTarget, _options: SplitTextOptions = {}) {
    const resolvedTargets = this.resolveTargets(target);
    resolvedTargets.forEach((node) => this.splitNode(node));
  }

  revert() {
    this.nodes.forEach((node) => {
      const original = this.originalHTML.get(node);
      if (original !== undefined) {
        node.innerHTML = original;
      }
    });
    this.chars = [];
    this.words = [];
    this.nodes = [];
    this.originalHTML.clear();
  }

  private resolveTargets(target: SplitTarget): HTMLElement[] {
    const items = Array.isArray(target) ? target : [target];
    return items.flatMap((item) => {
      if (typeof item === "string") {
        return Array.from(document.querySelectorAll<HTMLElement>(item));
      }
      return [item as HTMLElement];
    });
  }

  private splitNode(node: HTMLElement) {
    if (this.originalHTML.has(node)) {
      return;
    }

    this.nodes.push(node);
    this.originalHTML.set(node, node.innerHTML);

    const text = node.textContent ?? "";
    const words = text.trim().split(/\s+/).filter(Boolean);

    node.innerHTML = "";

    words.forEach((word, wordIndex) => {
      const wordSpan = document.createElement("span");
      wordSpan.className = "split-word";

      Array.from(word).forEach((char) => {
        const charSpan = document.createElement("span");
        charSpan.className = "split-char";
        charSpan.textContent = char;
        wordSpan.appendChild(charSpan);
        this.chars.push(charSpan);
      });

      this.words.push(wordSpan);
      node.appendChild(wordSpan);

      if (wordIndex < words.length - 1) {
        node.appendChild(document.createTextNode(" "));
      }
    });
  }
}

interface ParaElement extends HTMLElement {
  anim?: gsap.core.Animation;
  split?: SplitText;
}

gsap.registerPlugin(ScrollTrigger);

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;
  const paras: NodeListOf<ParaElement> = document.querySelectorAll(".para");
  const titles: NodeListOf<ParaElement> = document.querySelectorAll(".title");

  const TriggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  const ToggleAction = "play pause resume reverse";

  paras.forEach((para: ParaElement) => {
    para.classList.add("visible");
    if (para.anim) {
      para.anim.progress(1).kill();
      para.split?.revert();
    }

    para.split = new SplitText(para, {
      type: "lines,words",
      linesClass: "split-line",
    });

    para.anim = gsap.fromTo(
      para.split.words,
      { autoAlpha: 0, y: 80 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: para.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 1,
        ease: "power3.out",
        y: 0,
        stagger: 0.02,
      }
    );
  });
  titles.forEach((title: ParaElement) => {
    if (title.anim) {
      title.anim.progress(1).kill();
      title.split?.revert();
    }
    title.split = new SplitText(title, {
      type: "chars,lines",
      linesClass: "split-line",
    });
    title.anim = gsap.fromTo(
      title.split.chars,
      { autoAlpha: 0, y: 80, rotate: 10 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: title.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 0.8,
        ease: "power2.inOut",
        y: 0,
        rotate: 0,
        stagger: 0.03,
      }
    );
  });

  ScrollTrigger.addEventListener("refresh", () => setSplitText());
}
