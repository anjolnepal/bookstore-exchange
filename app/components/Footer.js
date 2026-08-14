export default function Footer() {
  return (
    <footer className="bg-spine-dark text-[#B9B39F] text-center py-6 px-5 text-xs mt-10">
      <div>
        © {new Date().getFullYear()} BookSwap — built as a student project
      </div>
      <div className="mt-2">
        <a href="/" className="underline text-[#D9D2BE] hover:text-white">
          About
        </a>{' '}
        &middot;{' '}
        <a href="#" className="underline text-[#D9D2BE] hover:text-white">
          GitHub
        </a>
      </div>
    </footer>
  );
}
