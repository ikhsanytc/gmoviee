function Hr({ space }: { space?: boolean }) {
  return (
    <>
      <hr
        className={`border-2 border-yellow-500 dark:border-blue-600 ${
          space && "mb-5"
        }`}
      />
    </>
  );
}

export default Hr;
