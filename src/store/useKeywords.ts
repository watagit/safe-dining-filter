import { getBucket } from "@extend-chrome/storage";
import { useEffect, useState } from "react";

type Bucket = {
  keywords: string[];
};

const bucket = getBucket<Bucket>("my_bucket", "local");

export const useKeywords = () => {
  const [keywords, setKeywords] = useState<string[]>([]);

  useEffect(() => {
    async () => {
      const value = await bucket.get();
      if (value.keywords) {
        setKeywords(value.keywords);
      }
    };
  }, []);

  const addKeyword = (keyword: string) => {
    const newKeywords = [...keywords, keyword];
    bucket.set({ keywords: newKeywords });
    setKeywords(newKeywords);
  };

  const removeKeyword = (keyword: string) => {
    const newKeywords = keywords.filter((k) => k !== keyword);
    bucket.set({ keywords: newKeywords });
    setKeywords(newKeywords);
  };

  return { keywords, addKeyword, removeKeyword };
};
