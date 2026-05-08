import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

afterEach(cleanup);

// import { afterEach } from "vitest" — импортируем хук afterEach из vitest. Это функция которая запускается после каждого теста.

// import { cleanup } from "@testing-library/react" — импортируем cleanup. Эта функция удаляет из DOM все компоненты которые были отрендерены во время теста, чтобы они не мешали следующему тесту.

// import "@testing-library/jest-dom" — подключает дополнительные матчеры для проверок в тестах. Без этого не работали бы вещи типа:

// afterEach(cleanup) — говорит vitest: после каждого теста вызывай cleanup, то есть чисти DOM.

// Если коротко — этот файл просто настраивает среду перед тестами: подключает матчеры и следит за тем чтобы после каждого теста DOM был чистым.    
