const SectionTitle = ({ children }) => (
  <h2 className="text-xl xl:text-2xl font-semibold mb-6 flex items-center gap-2 text-[hsl(var(--foreground))]">
    <span className="w-8 h-0.5 bg-gradient-primary rounded" />
    {children}
  </h2>
);

export default SectionTitle;