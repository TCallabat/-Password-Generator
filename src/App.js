/**
 * src\App.js
 */

/* Import React modules */
import React, { useState, useEffect } from "react";

/* Import CopyToClipboard modules */
import copy from "copy-to-clipboard";

/* Import GeneratePassword modules */
import { generate } from "generate-password";

/* Import BaseWeb modules */
import { useStyletron } from "baseui";
import { LightTheme, DarkTheme, ThemeProvider } from "baseui";
import { Radio, RadioGroup, ALIGN } from "baseui/radio";
import { toaster, ToasterContainer, PLACEMENT } from "baseui/toast";
import { Card } from "baseui/card";
import { Heading, HeadingLevel } from "baseui/heading";
import { Input } from "baseui/input";
import { Button, SHAPE } from "baseui/button";
import { Block } from "baseui/block";
import { FormControl } from "baseui/form-control";
import { Slider } from "baseui/slider";
import { Checkbox, STYLE_TYPE, LABEL_PLACEMENT } from "baseui/checkbox";

/* Function */
function App(props) {
    const [length, setLength] = useState(16);
    const [lowercase, setLowercase] = useState(true);
    const [uppercase, setUppercase] = useState(true);
    const [numbers, setNumbers] = useState(true);
    const [symbols, setSymbols] = useState(true);
    const [password, setPassword] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setNewPassword();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const message = (message, type) => {
        toaster[type](<>{message}</>);
    };

    const setNewPassword = (i) => {
        if (length < 1) {
            message("Length to short, couldn't be equal to 0", "warning");
            return setPassword("");
        }
        if (!lowercase && !uppercase && !numbers && !symbols) {
            message("At least one character's option must be checked", "warning");
            return setPassword("");
        }
        const newPassword = i ? i : generate({ length, lowercase, uppercase, numbers, symbols });
        setCopied(false);
        message("New password generated", "positive");
        setPassword(newPassword);
    };

    const copyToClipboard = () => {
        if (password.length === 0) {
            message('No password generated, please click "Generate password" before', "warning");
            return;
        }
        copy(password);
        setCopied(true);
        message("Password copied to clipboard", "info");
    };

    const THEME = { light: "light", dark: "dark" };
    const [theme, setTheme] = React.useState(THEME.light);
    const [css] = useStyletron();
    const width = css({ width: "100%", maxWidth: "25rem", margin: "auto" });
    const title = css({ textAlign: "center", textDecoration: "underline" });

    return (
        <ThemeProvider theme={theme === THEME.light ? LightTheme : DarkTheme}>
            <ToasterContainer placement={PLACEMENT.topRight} autoHideDuration={2500}>
                <Card className={width} style={{ border: "none" }}>
                    <HeadingLevel>
                        <Heading styleLevel={2} className={title}>
                            Password Generator
                        </Heading>
                        <Input disabled value={password} onChange={(event) => setNewPassword(event.target.value)} />
                        <p>
                            <Button className={width} shape={SHAPE.pill} onClick={() => setNewPassword()}>
                                Generate password
                            </Button>
                        </p>
                        <p>
                            <Button className={width} shape={SHAPE.pill} onClick={copyToClipboard}>
                                {copied ? "Copied to clipboard" : "Copy password"}
                            </Button>
                        </p>
                        <Block style={{ margin: "2rem 0 1rem" }}>
                            <FormControl label="Length">
                                <>
                                    <Slider step={2} min={0} max={32} value={[length]} onChange={({ value }) => setLength(value[0])} />
                                </>
                            </FormControl>
                        </Block>
                        <Block style={{ margin: "1rem 0" }}>
                            <FormControl label="Characters">
                                <>
                                    <Checkbox
                                        checked={lowercase}
                                        checkmarkType={STYLE_TYPE.toggle_round}
                                        onChange={() => setLowercase(!lowercase)}
                                        labelPlacement={LABEL_PLACEMENT.right}
                                    >
                                        LowerCase (a, b, c, ...)
                                    </Checkbox>
                                    <Checkbox
                                        checked={uppercase}
                                        checkmarkType={STYLE_TYPE.toggle_round}
                                        onChange={() => setUppercase(!uppercase)}
                                        labelPlacement={LABEL_PLACEMENT.right}
                                    >
                                        UpperCase (A, B, C, ...)
                                    </Checkbox>
                                    <Checkbox
                                        checked={numbers}
                                        checkmarkType={STYLE_TYPE.toggle_round}
                                        onChange={() => setNumbers(!numbers)}
                                        labelPlacement={LABEL_PLACEMENT.right}
                                    >
                                        Numbers (0, 1, 2, ...)
                                    </Checkbox>
                                    <Checkbox
                                        checked={symbols}
                                        checkmarkType={STYLE_TYPE.toggle_round}
                                        onChange={() => setSymbols(!symbols)}
                                        labelPlacement={LABEL_PLACEMENT.right}
                                    >
                                        Special (%, @, #, ...)
                                    </Checkbox>
                                </>
                            </FormControl>
                        </Block>
                        <Block style={{ margin: "1rem 0" }}>
                            <FormControl label="Theme">
                                <>
                                    <RadioGroup align={ALIGN.horizontal} onChange={(e) => setTheme(e.target.value)} value={theme}>
                                        <Radio value="light">Light</Radio>
                                        <Radio value="dark">Dark</Radio>
                                    </RadioGroup>
                                </>
                            </FormControl>
                        </Block>
                    </HeadingLevel>
                </Card>
            </ToasterContainer>
        </ThemeProvider>
    );
}

/* Export */
export default App;
