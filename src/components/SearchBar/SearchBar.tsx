import css from "./SearchBar.module.css";
import toast from "react-hot-toast";
import { FormEvent } from 'react';
import { HandleSubmit } from "./SearchBar.types";

export default function SearchBar({ onSubmit}:HandleSubmit) {
  const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const newTopic = form.elements.namedItem('topic') as HTMLInputElement;
    const trimmedTopic = newTopic.value.trim();
    if (trimmedTopic == "") {
      toast.error("The search field must be filled!");
      return;
    }
    onSubmit(trimmedTopic);
    form.reset();
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          name="topic"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.button} type="submit">
          Search
        </button>
      </form>
    </header>
  );
}
