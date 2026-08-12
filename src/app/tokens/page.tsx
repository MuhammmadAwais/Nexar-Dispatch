import { Button } from "../../components/ui/Button";
import { Section } from "../../components/ui/Section";
import { Eyebrow } from "../../components/ui/Eyebrow";
import { Reveal } from "../../components/ui/Reveal";
import { Card } from "../../components/ui/Card";

export default function TokensPage() {
  const colors = [
    { name: 'bg', class: 'bg-bg' },
    { name: 'surface', class: 'bg-surface' },
    { name: 'surface-2', class: 'bg-surface-2' },
    { name: 'line', class: 'bg-line' },
    { name: 'line-bright', class: 'bg-line-bright' },
    { name: 'text', class: 'bg-text' },
    { name: 'text-body', class: 'bg-text-body' },
    { name: 'text-muted', class: 'bg-text-muted' },
    { name: 'paper', class: 'bg-paper' },
    { name: 'accent', class: 'bg-accent' },
    { name: 'accent-2', class: 'bg-accent-2' },
    { name: 'ok', class: 'bg-ok' },
  ];

  const typography = [
    { name: 'display-xl', class: 'text-display-xl font-display' },
    { name: 'display-l', class: 'text-display-l font-display' },
    { name: 'display-m', class: 'text-display-m font-display' },
    { name: 'body-l', class: 'text-body-l font-body' },
    { name: 'body (default)', class: 'text-body font-body' },
    { name: 'label', class: 'text-label font-mono uppercase tracking-label text-text-muted' },
  ];

  const radii = [
    { name: 'radius-card', class: 'rounded-card' },
    { name: 'radius-button', class: 'rounded-button' },
  ];

  return (
    <main className="p-12 space-y-24 max-w-7xl mx-auto">
      <section>
        <h2 className="text-display-m mb-8 pb-4 border-b border-line">Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {colors.map((color) => (
            <div key={color.name} className="space-y-3">
              <div className={`h-24 w-full rounded-card border border-line ${color.class}`} />
              <p className="text-label font-mono uppercase tracking-label">{color.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-display-m mb-8 pb-4 border-b border-line">Typography</h2>
        <div className="space-y-12">
          {typography.map((type) => (
            <div key={type.name} className="space-y-2">
              <p className="text-label font-mono uppercase tracking-label text-accent">{type.name}</p>
              <p className={`${type.class} text-text`}>
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-display-m mb-8 pb-4 border-b border-line">Radii</h2>
        <div className="flex gap-8">
          {radii.map((radius) => (
            <div key={radius.name} className="space-y-4 text-center">
              <div
                className={`w-32 h-32 bg-surface border border-line-bright flex items-center justify-center ${radius.class}`}
              >
                <span className="text-accent text-sm">Target</span>
              </div>
              <p className="text-label font-mono uppercase tracking-label">{radius.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-display-m mb-8 pb-4 border-b border-line">Interactive</h2>
        <div className="flex gap-6">
          <button className="px-6 py-3 bg-accent text-white font-body rounded-button hover:bg-surface-2 hover:border hover:border-line-bright transition-all duration-quick ease-quick text-sm">
            Quick Transition Hover
          </button>
          
          <div className="w-64 p-6 bg-surface border border-line rounded-card hover:bg-surface-2 hover:border-line-bright hover:-translate-y-1 transition-all duration-base ease-base">
            <h3 className="text-display-m mb-2">Hover me</h3>
            <p className="text-text-muted text-sm">Base transition</p>
          </div>
        </div>
      </section>

      <Section index="01" title="PRIMITIVES">
        <Reveal>
          <div className="space-y-12">
            <div>
              <Eyebrow>Button Variants</Eyebrow>
              <div className="flex items-center gap-6">
                <Button variant="primary" size="md">Primary Button</Button>
                <Button variant="secondary" size="md">Secondary Button</Button>
                <Button variant="primary" size="lg">Large Button</Button>
              </div>
            </div>

            <div>
              <Eyebrow>Card & Reveal Component</Eyebrow>
              <Reveal stagger staggerDelay={0.1}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h3 className="text-display-m mb-2">Service Card</h3>
                    <p className="text-text-body text-sm">Cards use base hover treatments and subtle borders.</p>
                  </Card>
                  <Card className="p-6">
                    <h3 className="text-display-m mb-2">Another Card</h3>
                    <p className="text-text-body text-sm">Animated via Reveal stagger prop.</p>
                  </Card>
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
