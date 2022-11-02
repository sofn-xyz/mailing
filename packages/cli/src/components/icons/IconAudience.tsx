export default function IconAudience({ fill }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12" fill="none">
      <circle cx="6.6" cy="3" r="3" fill={fill} />
      <path
        fill={fill}
        d="m4.046 8.272-2.201.923A3.009 3.009 0 0 0 0 11.97c0 .017.013.03.03.03h13.14a.03.03 0 0 0 .03-.03 3.009 3.009 0 0 0-1.845-2.775l-2.201-.923a6.6 6.6 0 0 0-5.108 0Z"
      />
      <circle cx="14.7" cy="3.5" r="1.5" fill={fill} />
      <path
        fill={fill}
        d="m13.423 6.136-1.1.462a1.505 1.505 0 0 0-.923 1.387c0 .008.007.015.015.015h6.57A.015.015 0 0 0 18 7.985c0-.606-.364-1.153-.923-1.387l-1.1-.462a3.3 3.3 0 0 0-2.554 0Z"
      />
    </svg>
  );
}
