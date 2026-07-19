const SectionTitle = ({ title, subtitle, center = false, className = "" }) => {
  return (
    <div className={`${center ? "text-center" : ""} mb-10 ${className}`}>
      <h2 className="text-3xl font-bold text-(--dark) md:text-4xl">{title}</h2>

      {subtitle && (
        <p className="mt-3 text-(--text-secondary) max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
