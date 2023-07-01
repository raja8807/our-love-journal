const PageHead = (props) => {
  return (
    <h1 style={{ fontSize: "35px", fontWeight: "600", textAlign: "center" }}>
      {props?.children}
    </h1>
  );
};

export default PageHead;
