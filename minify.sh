for FILE in dist/*.js; do
    yarn uglifyjs $FILE --compress --mangle --output $FILE;
done
